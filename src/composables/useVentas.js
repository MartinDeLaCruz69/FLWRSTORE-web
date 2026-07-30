import { ref, watch, isRef, onUnmounted } from "vue";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
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
        if (err.code !== "permission-denied") {
          console.error("useVentas error:", err);
        }
        cargando.value = false;
      },
    );
  };

  if (isRef(uid)) {
    watch(
      uid,
      (val) => {
        if (val) {
          iniciarQuery(val);
        } else if (!soloMias) {
          iniciarQuery(null);
        } else {
          unsub();
          ventas.value = [];
          cargando.value = false;
        }
      },
      { immediate: true },
    );
  } else {
    if (uid || !soloMias) {
      iniciarQuery(uid);
    } else {
      cargando.value = false;
    }
  }

  onUnmounted(() => unsub());

  const editarVenta = async (id, cambios) => {
    const { fechaVenta, uid: _uid, productoId, ...camposPermitidos } = cambios;
    return updateDoc(doc(db, "ventas", id), camposPermitidos);
  };

  const eliminarVenta = async (id, motivo = "") => {
    return updateDoc(doc(db, "ventas", id), {
      eliminada: true,
      eliminadaEn: serverTimestamp(),
      motivoEliminacion: motivo || "Eliminada por admin",
    });
  };

  return {
    ventas,
    cargando,
    editarVenta,
    eliminarVenta,
  };
}
