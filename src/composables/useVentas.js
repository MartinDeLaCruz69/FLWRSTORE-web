import { ref, watch, isRef, onUnmounted } from "vue";
import { db } from "../firebase";
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
  where,
} from "firebase/firestore";

export function useVentas({ soloMias = false, uid = null } = {}) {
  const ventas = ref([]);
  const cargando = ref(true);

  let unsub = () => {};

  const iniciarQuery = (uidReal) => {
    unsub();

    const q =
      soloMias && uidReal
        ? query(
            collection(db, "ventas"),
            where("uid", "==", uidReal),
            orderBy("fechaVenta", "desc"),
          )
        : query(collection(db, "ventas"), orderBy("fechaVenta", "desc"));

    unsub = onSnapshot(
      q,
      (snap) => {
        ventas.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        cargando.value = false;
      },
      (err) => {
        console.error("useVentas error:", err);
        cargando.value = false;
      },
    );
  };

  if (isRef(uid)) {
    watch(
      uid,
      (val) => {
        if (val) iniciarQuery(val);
      },
      { immediate: true },
    );
  } else {
    iniciarQuery(uid);
  }

  onUnmounted(() => unsub());

  const registrarVenta = async (datos) => {
    return addDoc(collection(db, "ventas"), {
      uid: datos.uid || null,
      nombreCliente: datos.nombreCliente || "Desconocido",
      emailCliente: datos.emailCliente || "",
      productoId: datos.productoId,
      nombreProducto: datos.nombreProducto,
      grupo: datos.grupo || "",
      categoria: datos.categoria || "",
      imagenUrl: datos.imagenUrl || null,
      esLote: datos.esLote || false,
      itemsComprados: datos.itemsComprados || null,
      precioFinal: Number(datos.precioFinal) || 0,
      notas: datos.notas || "",
      asignadoPorAdmin: datos.asignadoPorAdmin || false,
      fechaVenta: serverTimestamp(),
    });
  };

  const editarVenta = async (id, cambios) => {
    const { fechaVenta, uid: _uid, productoId, ...camposPermitidos } = cambios;
    return updateDoc(doc(db, "ventas", id), camposPermitidos);
  };

  const eliminarVenta = async (id) => {
    return deleteDoc(doc(db, "ventas", id));
  };

  return {
    ventas,
    cargando,
    registrarVenta,
    editarVenta,
    eliminarVenta,
  };
}
