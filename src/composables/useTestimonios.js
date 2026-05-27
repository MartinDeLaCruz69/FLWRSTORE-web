import { ref } from "vue";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const testimonios = ref([]);
const cargando = ref(false);
let unsubscribe = null;

export function useTestimonios() {
  const escucharTestimonios = () => {
    if (unsubscribe) return;
    cargando.value = true;
    const q = query(collection(db, "testimonios"), orderBy("fecha", "asc"));
    unsubscribe = onSnapshot(
      q,
      (snap) => {
        testimonios.value = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        cargando.value = false;
      },
      (err) => {
        console.error("Error escuchando testimonios:", err);
        cargando.value = false;
      },
    );
  };

  const pararEscuchaTestimonios = () => {
    unsubscribe?.();
    unsubscribe = null;
  };

  const agregarTestimonio = async (datos, fotoBase64 = null) => {
    let fotoURL = null;
    if (fotoBase64) {
      const fileName = `testimonios/${Date.now()}.jpg`;
      const imageRef = storageRef(storage, fileName);
      await uploadString(imageRef, fotoBase64, "data_url");
      fotoURL = await getDownloadURL(imageRef);
    }
    const docData = {
      name: datos.name.trim(),
      location: datos.location?.trim() || "México",
      text: datos.text.trim(),
      product: datos.product?.trim() || "Compra verificada",
      emoji: "🌸",
      fecha: serverTimestamp(),
    };
    if (fotoURL) {
      docData.foto = fotoURL;
    }

    await addDoc(collection(db, "testimonios"), docData);
  };

  const eliminarTestimonio = async (id) => {
    await deleteDoc(doc(db, "testimonios", id));
  };

  return {
    testimonios,
    cargando,
    escucharTestimonios,
    pararEscuchaTestimonios,
    agregarTestimonio,
    eliminarTestimonio,
  };
}
