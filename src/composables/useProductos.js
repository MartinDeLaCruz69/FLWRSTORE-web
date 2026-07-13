import { ref, onUnmounted } from "vue";
import { db, storage } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export function useProductos() {
  const productos = ref([]);
  const cargando = ref(true);

  const unsub = onSnapshot(
    query(collection(db, "productos"), orderBy("fechaCreacion", "desc")),
    (snap) => {
      productos.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      cargando.value = false;
    },
    () => {
      cargando.value = false;
    },
  );
  onUnmounted(() => unsub());

  const subirImagen = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const path = `productos/${Date.now()}_${file.name}`;
      const sRef = storageRef(storage, path);
      const task = uploadBytesResumable(sRef, file);
      task.on(
        "state_changed",
        (snap) =>
          onProgress?.(
            Math.round((snap.bytesTransferred / snap.totalBytes) * 100),
          ),
        reject,
        async () =>
          resolve({
            url: await getDownloadURL(task.snapshot.ref),
            path: task.snapshot.ref.fullPath,
          }),
      );
    });
  };

  const agregarProducto = async (datos, imagenFile, onProgress) => {
    let imagenUrl = null;
    let imagenPath = null;
    if (imagenFile) {
      const result = await subirImagen(imagenFile, onProgress);
      imagenUrl = result.url;
      imagenPath = result.path;
    }

    return addDoc(collection(db, "productos"), {
      ...datos,
      precio: Math.max(0, Number(datos.precio) || 0),
      imagenUrl,
      imagenPath,
      apartadoPor: null,
      fechaApartado: null,
      apartadoPorUid: null,
      fechaCreacion: serverTimestamp(),
    });
  };

  const editarProducto = async (
    id,
    datos,
    imagenFile,
    imagenPathVieja,
    onProgress,
  ) => {
    let updates = { ...datos, precio: Math.max(0, Number(datos.precio) || 0) };

    const productoActual = productos.value.find((p) => p.id === id);
    if (productoActual) {
      const precioNuevo = Number(datos.precio);
      const precioActual = Number(productoActual.precio);
      if (precioNuevo < precioActual) {
        updates.precioAnterior = precioActual;
      } else {
        updates.precioAnterior = null;
      }

      const estadoAnterior = productoActual.estado;
      const estadoNuevo = datos.estado;

      if (estadoNuevo === "disponible" && estadoAnterior !== "disponible") {
        updates.apartadoPor = null;
        updates.apartadoPorUid = null;
        updates.fechaApartado = null;
        updates.precioAnterior = null;

        if (estadoAnterior === "vendido") {
          try {
            const ventasSnap = await getDocs(
              query(collection(db, "ventas"), where("productoId", "==", id)),
            );
            for (const ventaDoc of ventasSnap.docs) {
              const data = ventaDoc.data();
              if (!data.eliminada) {
                await updateDoc(doc(db, "ventas", ventaDoc.id), {
                  eliminada: true,
                  eliminadaEn: serverTimestamp(),
                  motivoEliminacion:
                    "Estado cambiado a disponible desde panel de edición",
                });
              }
            }
          } catch (e) {
            console.warn("No se pudieron limpiar ventas al editar:", e);
          }
        }

        if (productoActual.esLote && productoActual.items?.length) {
          if (estadoAnterior === "vendido") {
            updates.items = productoActual.items.map((item) => ({
              ...item,
              estado: "disponible",
              apartadoPor: null,
              apartadoPorUid: null,
              fechaApartado: null,
            }));
          }
        }
      }
    }

    if (imagenFile) {
      const result = await subirImagen(imagenFile, onProgress);
      updates.imagenUrl = result.url;
      updates.imagenPath = result.path;
      if (imagenPathVieja) {
        try {
          await deleteObject(storageRef(storage, imagenPathVieja));
        } catch (_) {}
      }
    }

    if (
      updates.estado === "parcial" &&
      productoActual?.esLote &&
      productoActual.items?.length
    ) {
      const tieneApartados = productoActual.items.some(
        (i) => i.estado === "apartado",
      );
      const tieneDisponibles = productoActual.items.some(
        (i) => i.estado === "disponible",
      );
      if (!tieneApartados) {
        updates.estado = tieneDisponibles ? "disponible" : "vendido";
      }
    }

    return updateDoc(doc(db, "productos", id), updates);
  };

  const eliminarProducto = async (id, imagenPath) => {
    if (imagenPath) {
      try {
        await deleteObject(storageRef(storage, imagenPath));
      } catch (_) {}
    }
    return deleteDoc(doc(db, "productos", id));
  };

  const apartarProducto = (id, nombre, uid = null) =>
    updateDoc(doc(db, "productos", id), {
      estado: "apartado",
      apartadoPor: nombre,
      apartadoPorUid: uid,
      fechaApartado: serverTimestamp(),
    });

  const liberarProducto = async (id) => {
    const productoActual = productos.value.find((p) => p.id === id);

    const eraVendido = productoActual?.estado === "vendido";

    await updateDoc(doc(db, "productos", id), {
      estado: "disponible",
      apartadoPor: null,
      apartadoPorUid: null,
      fechaApartado: null,
      ...(eraVendido ? { precioAnterior: null } : {}),
    });

    if (eraVendido) {
      try {
        const ventasSnap = await getDocs(
          query(collection(db, "ventas"), where("productoId", "==", id)),
        );
        for (const ventaDoc of ventasSnap.docs) {
          const data = ventaDoc.data();
          if (!data.eliminada) {
            await updateDoc(doc(db, "ventas", ventaDoc.id), {
              eliminada: true,
              eliminadaEn: serverTimestamp(),
              motivoEliminacion: "Producto regresado a disponible por admin",
            });
          }
        }
      } catch (e) {
        console.warn("No se pudo limpiar venta asociada:", e);
      }
    }
  };

  const liberarItemsLote = async (id) => {
    const productoActual = productos.value.find((p) => p.id === id);
    if (!productoActual?.items?.length) {
      return liberarProducto(id);
    }

    const itemsLiberados = productoActual.items.map((item) => ({
      id: String(item.id),
      nombre: item.nombre || "",
      precio: Number(item.precio) || 0,
      estado: item.estado === "vendido" ? "vendido" : "disponible",
      apartadoPor: item.estado === "vendido" ? item.apartadoPor : null,
      apartadoPorUid: item.estado === "vendido" ? item.apartadoPorUid : null,
      fechaApartado: item.estado === "vendido" ? item.fechaApartado : null,
    }));

    const quedanVendidos = itemsLiberados.some((i) => i.estado === "vendido");
    const estadoLote = quedanVendidos ? "parcial" : "disponible";

    const eraVendido = productoActual?.estado === "vendido";

    await updateDoc(doc(db, "productos", id), {
      items: itemsLiberados,
      estado: estadoLote,
      apartadoPor: null,
      apartadoPorUid: null,
      fechaApartado: null,
      ...(eraVendido ? { precioAnterior: null } : {}),
    });

    if (eraVendido) {
      try {
        const ventasSnap = await getDocs(
          query(collection(db, "ventas"), where("productoId", "==", id)),
        );
        for (const ventaDoc of ventasSnap.docs) {
          const data = ventaDoc.data();
          if (!data.eliminada) {
            await updateDoc(doc(db, "ventas", ventaDoc.id), {
              eliminada: true,
              eliminadaEn: serverTimestamp(),
              motivoEliminacion: "Lote regresado a disponible por admin",
            });
          }
        }
      } catch (e) {
        console.warn("No se pudo limpiar venta asociada:", e);
      }
    }
  };

  const marcarVendido = async (id, datosVenta = null) => {
    await updateDoc(doc(db, "productos", id), { estado: "vendido" });

    if (datosVenta) {
      await addDoc(collection(db, "ventas"), {
        productoId: id,
        nombreProducto: datosVenta.nombreProducto || "",
        grupo: datosVenta.grupo || "",
        categoria: datosVenta.categoria || "",
        imagenUrl: datosVenta.imagenUrl || null,
        esLote: false,
        itemsComprados: null,
        nombreCliente: datosVenta.nombreCliente || "Sin asignar",
        emailCliente: datosVenta.emailCliente || "",
        uid: datosVenta.uid || null,
        precioFinal: Number(datosVenta.precioFinal) || 0,
        notas: datosVenta.notas || "",
        asignadoPorAdmin: true,
        fechaVenta: serverTimestamp(),
      });
    }
  };

  const marcarItemsLoteVendidos = async (id, itemIds, datosVenta = null) => {
    const productoActual = productos.value.find((p) => p.id === id);
    if (!productoActual?.items?.length) return;

    const itemsActualizados = productoActual.items.map((item) => ({
      ...item,
      estado: itemIds.includes(String(item.id)) ? "vendido" : item.estado,
    }));

    const todosVendidos = itemsActualizados.every(
      (i) => i.estado === "vendido",
    );
    const algunoDisponibleV = itemsActualizados.some(
      (i) => i.estado === "disponible",
    );
    const algunoApartadoV = itemsActualizados.some(
      (i) => i.estado === "apartado",
    );
    const algunoVendidoV = itemsActualizados.some(
      (i) => i.estado === "vendido",
    );

    let nuevoEstado;
    if (todosVendidos) {
      nuevoEstado = "vendido";
    } else if (!algunoDisponibleV && !algunoApartadoV) {
      nuevoEstado = "vendido";
    } else if (algunoApartadoV && !algunoDisponibleV && !algunoVendidoV) {
      nuevoEstado = "apartado";
    } else if (algunoApartadoV) {
      nuevoEstado = "parcial";
    } else if (algunoVendidoV && algunoDisponibleV) {
      nuevoEstado = "parcial";
    } else {
      nuevoEstado = "disponible";
    }

    await updateDoc(doc(db, "productos", id), {
      items: itemsActualizados,
      estado: nuevoEstado,
    });

    if (datosVenta) {
      const itemsVendidos = productoActual.items.filter((i) =>
        itemIds.includes(String(i.id)),
      );
      const precioTotal = itemsVendidos.reduce(
        (a, i) => a + Number(i.precio),
        0,
      );

      await addDoc(collection(db, "ventas"), {
        productoId: id,
        nombreProducto: datosVenta.nombreProducto || productoActual.nombre,
        grupo: datosVenta.grupo || productoActual.grupo,
        categoria: datosVenta.categoria || productoActual.categoria,
        imagenUrl: datosVenta.imagenUrl || productoActual.imagenUrl || null,
        esLote: true,
        itemsComprados: itemsVendidos.map((i) => ({
          id: i.id,
          nombre: i.nombre,
          precio: Number(i.precio),
        })),
        nombreCliente: datosVenta.nombreCliente || "Sin asignar",
        emailCliente: datosVenta.emailCliente || "",
        uid: datosVenta.uid || productoActual.apartadoPorUid || null,
        precioFinal: Number(datosVenta.precioFinal) || precioTotal,
        notas: datosVenta.notas || "",
        asignadoPorAdmin: true,
        fechaVenta: serverTimestamp(),
      });
    }
  };

  const apartarItemsLote = (id, nombre, itemsSeleccionados, uid = null) => {
    const productoActual = productos.value.find((p) => p.id === id);
    if (!productoActual)
      return Promise.reject(new Error("Producto no encontrado"));
    if (!productoActual.items?.length)
      return Promise.reject(new Error("Producto sin items"));

    const itemsActualizados = productoActual.items.map((item) => {
      const esteSeleccionado = itemsSeleccionados.includes(String(item.id));
      return {
        id: String(item.id),
        nombre: item.nombre || "",
        precio: Number(item.precio) || 0,
        estado: esteSeleccionado ? "apartado" : item.estado || "disponible",
        apartadoPor: esteSeleccionado ? nombre : item.apartadoPor || null,
        apartadoPorUid: esteSeleccionado ? uid : item.apartadoPorUid || null,
        fechaApartado: esteSeleccionado
          ? new Date().toISOString()
          : item.fechaApartado || null,
      };
    });

    const algunoDisponible = itemsActualizados.some(
      (i) => i.estado === "disponible",
    );
    const algunoApartado = itemsActualizados.some(
      (i) => i.estado === "apartado",
    );
    const algunoVendido = itemsActualizados.some((i) => i.estado === "vendido");

    let nuevoEstadoLote;
    if (!algunoDisponible && !algunoApartado) {
      nuevoEstadoLote = "vendido";
    } else if (algunoApartado && !algunoDisponible && !algunoVendido) {
      nuevoEstadoLote = "apartado";
    } else if (algunoApartado) {
      nuevoEstadoLote = "parcial";
    } else if (algunoVendido && algunoDisponible) {
      nuevoEstadoLote = "parcial";
    } else {
      nuevoEstadoLote = "disponible";
    }

    const todosApartados = nuevoEstadoLote === "apartado";

    return updateDoc(doc(db, "productos", id), {
      items: itemsActualizados,
      estado: nuevoEstadoLote,
      apartadoPor: todosApartados ? nombre : null,
      apartadoPorUid: todosApartados ? uid : null,
      fechaApartado: serverTimestamp(),
    });
  };

  return {
    productos,
    cargando,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    apartarProducto,
    apartarItemsLote,
    liberarProducto,
    liberarItemsLote,
    marcarVendido,
    marcarItemsLoteVendidos,
  };
}
