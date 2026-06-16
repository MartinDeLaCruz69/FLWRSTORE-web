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

  const apartarProducto = (id, nombre) =>
    updateDoc(doc(db, "productos", id), {
      estado: "apartado",
      apartadoPor: nombre,
      fechaApartado: serverTimestamp(),
    });

  const liberarProducto = (id) =>
    updateDoc(doc(db, "productos", id), {
      estado: "disponible",
      apartadoPor: null,
      fechaApartado: null,
    });

  const marcarVendido = (id) =>
    updateDoc(doc(db, "productos", id), { estado: "vendido" });

  const apartarItemsLote = (id, nombre, itemsSeleccionados) => {
    const productoActual = productos.value.find((p) => p.id === id);
    if (!productoActual) return;

    const itemsActualizados = productoActual.items.map((item) => ({
      ...item,
      apartadoPor: itemsSeleccionados.includes(item.id)
        ? nombre
        : item.apartadoPor || null,
      estado: itemsSeleccionados.includes(item.id)
        ? "apartado"
        : item.estado || "disponible",
    }));

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
    liberarProducto,
    marcarVendido,
    apartarItemsLote,
  };
}
