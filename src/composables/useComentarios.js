import { ref } from 'vue'
import { db } from '../firebase'
import {
  collection, addDoc, onSnapshot,
  query, orderBy, updateDoc, doc, serverTimestamp
} from 'firebase/firestore'

const comentarios = ref([])
const cargando    = ref(false)
let unsubscribe   = null

export function useComentarios() {

  // ── Escuchar todos los comentarios (solo admin) ────────────
  const escucharComentarios = () => {
    if (unsubscribe) return // ya está escuchando
    cargando.value = true
    const q = query(collection(db, 'comentarios'), orderBy('fecha', 'desc'))
    unsubscribe = onSnapshot(q, (snap) => {
      comentarios.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cargando.value = false
    })
  }

  const pararEscucha = () => {
    unsubscribe?.()
    unsubscribe = null
  }

  // ── Enviar comentario (clientes) ───────────────────────────
  const enviarComentario = async (texto, usuario) => {
    if (!texto?.trim() || !usuario) return
    await addDoc(collection(db, 'comentarios'), {
      texto:       texto.trim(),
      autor:       usuario.email,
      nombreAutor: usuario.displayName || usuario.email?.split('@')[0] || 'Cliente',
      fecha:       serverTimestamp(),
      leido:       false,
    })
  }

  // ── Marcar como leído (admin) ──────────────────────────────
  const marcarLeido = async (id) => {
    await updateDoc(doc(db, 'comentarios', id), { leido: true })
  }

  return { comentarios, cargando, escucharComentarios, pararEscucha, enviarComentario, marcarLeido }
}