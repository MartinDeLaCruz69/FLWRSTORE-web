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

  // ── Escuchar en tiempo real ────────────────────────────────
  const escucharTestimonios = () => {
    if (unsubscribe) return
    cargando.value = true
    const q = query(collection(db, 'testimonios'), orderBy('fecha', 'asc'))
    unsubscribe = onSnapshot(q, (snap) => {
      testimonios.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cargando.value = false
    }, () => { cargando.value = false })
  }

  const pararEscuchaTestimonios = () => {
    unsubscribe?.()
    unsubscribe = null
  }

  // ── Agregar testimonio (solo admin) ───────────────────────
  const agregarTestimonio = async (datos, fotoBase64 = null) => {
    await addDoc(collection(db, 'testimonios'), {
      name:     datos.name.trim(),
      location: datos.location?.trim() || 'México',
      text:     datos.text.trim(),
      product:  datos.product?.trim() || 'Compra verificada',
      foto:     fotoBase64 || null,
      emoji:    '🌸',
      fecha:    serverTimestamp(),
    })
  }

  // ── Eliminar testimonio (solo admin) ──────────────────────
  const eliminarTestimonio = async (id) => {
    await deleteDoc(doc(db, 'testimonios', id))
  }

  return {
    testimonios, cargando,
    escucharTestimonios, pararEscuchaTestimonios,
    agregarTestimonio, eliminarTestimonio,
  }
}