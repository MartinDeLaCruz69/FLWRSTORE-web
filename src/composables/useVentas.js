import { ref, onUnmounted } from "vue";
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

  const q =
    soloMias && uid
      ? query(
          collection(db, "ventas"),
          where("uid", "==", uid),
          orderBy("fechaVenta", "desc"),
        )
      : query(collection(db, "ventas"), orderBy("fechaVenta", "desc"));

  const unsub = onSnapshot(
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

  onUnmounted(() => unsub());

  // ── Registrar venta (admin asigna manualmente o se llama al marcar vendido) ──
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

  // ── Editar notas o datos de una venta (solo admin) ──
  const editarVenta = async (id, cambios) => {
    return updateDoc(doc(db, "ventas", id), {
      ...cambios,
      fechaVenta: undefined,
      uid: undefined,
    });
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
