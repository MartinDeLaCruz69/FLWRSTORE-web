import { ref } from 'vue'
import { db } from '../firebase'
import {
  collection, addDoc, onSnapshot, deleteDoc,
  doc, query, orderBy, serverTimestamp
} from 'firebase/firestore'

const testimonios = ref([])
const cargando    = ref(false)
let unsubscribe   = null

export function useTestimonios() {

  const escucharTestimonios = () => {
    if (unsubscribe) return
    cargando.value = true
    const q = query(collection(db, 'testimonios'), orderBy('fecha', 'asc'))
    unsubscribe = onSnapshot(q, (snap) => {
      testimonios.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cargando.value = false
    }, (err) => {
      console.error('Error escuchando testimonios:', err)
      cargando.value = false
    })
  }

  const pararEscuchaTestimonios = () => {
    unsubscribe?.()
    unsubscribe = null
  }

  const agregarTestimonio = async (datos, fotoBase64 = null) => {
    const docData = {
      name:     datos.name.trim(),
      location: datos.location?.trim() || 'México',
      text:     datos.text.trim(),
      product:  datos.product?.trim() || 'Compra verificada',
      emoji:    '🌸',
      fecha:    serverTimestamp(),
    }
    // Solo agrega foto si existe, evita guardar null
    if (fotoBase64) docData.foto = fotoBase64

    await addDoc(collection(db, 'testimonios'), docData)
  }

  const eliminarTestimonio = async (id) => {
    await deleteDoc(doc(db, 'testimonios', id))
  }

  return {
    testimonios, cargando,
    escucharTestimonios, pararEscuchaTestimonios,
    agregarTestimonio, eliminarTestimonio,
  }
}