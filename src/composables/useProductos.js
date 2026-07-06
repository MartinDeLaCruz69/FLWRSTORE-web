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
      precio: Number(datos.precio),
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
    let updates = { ...datos, precio: Number(datos.precio) };

    const productoActual = productos.value.find((p) => p.id === id);
    if (productoActual) {
      const precioNuevo = Number(datos.precio);
      const precioActual = Number(productoActual.precio);
      if (precioNuevo < precioActual) {
        updates.precioAnterior = precioActual;
      } else {
        updates.precioAnterior = null;
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

  const liberarProducto = (id) =>
    updateDoc(doc(db, "productos", id), {
      estado: "disponible",
      apartadoPor: null,
      fechaApartado: null,
    });

  const liberarItemsLote = (id) => {
    const productoActual = productos.value.find((p) => p.id === id);
    if (!productoActual?.items?.length) {
      return liberarProducto(id);
    }
    const itemsLiberados = productoActual.items.map((item) => ({
      id: String(item.id),
      nombre: item.nombre || "",
      precio: Number(item.precio) || 0,
      estado: "disponible",
      apartadoPor: null,
      apartadoPorUid: null,
      fechaApartado: null,
    }));
    return updateDoc(doc(db, "productos", id), {
      items: itemsLiberados,
      estado: "disponible",
      apartadoPor: null,
      apartadoPorUid: null,
      fechaApartado: null,
    });
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
    const algunoDisponible = itemsActualizados.some(
      (i) => i.estado === "disponible",
    );
    const algunoApartado = itemsActualizados.some(
      (i) => i.estado === "apartado",
    );

    const nuevoEstado = todosVendidos
      ? "vendido"
      : algunoDisponible
        ? algunoApartado
          ? "parcial"
          : "disponible"
        : algunoApartado
          ? "apartado"
          : "vendido";

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
        uid: datosVenta.uid || itemsVendidos[0]?.apartadoPorUid || null,
        uid: datosVenta.uid || productoActual.apartadoPorUid || null,
        uid:
          datosVenta.uid ||
          productos.value.find((p) => p.id === id)?.apartadoPorUid ||
          null,
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

    const todosApartados = itemsActualizados.every(
      (i) => i.estado !== "disponible",
    );
    const algunoApartado = itemsActualizados.some(
      (i) => i.estado === "apartado",
    );

    return updateDoc(doc(db, "productos", id), {
      items: itemsActualizados,
      estado: todosApartados
        ? "apartado"
        : algunoApartado
          ? "parcial"
          : "disponible",
      apartadoPor: todosApartados ? nombre : null,
      apartadoPorUid: todosApartados ? uid : null,
      fechaApartado: serverTimestamp(),
    });

    return {
      productos,
      cargando,
      agregarProducto,
      editarProducto,
      eliminarProducto,
      apartarProducto,
      liberarProducto,
      liberarItemsLote,
      marcarVendido,
      marcarItemsLoteVendidos,
      apartarItemsLote,
    };
  };
}
