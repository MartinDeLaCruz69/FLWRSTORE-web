// src/composables/useAuth.js
import { ref, computed } from 'vue'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const auth          = getAuth()
const usuarioActual = ref(null)   // objeto Firebase User
const rolActual     = ref(null)   // 'admin' | 'subadmin' | 'cliente' | null
const cargandoAuth  = ref(true)

// ── Lista de emails admin (ajusta según necesites) ──────────
const ADMIN_EMAILS = ['andrea@flwrstore.com', 'admin@flwrstore.com']

// ── Escucha cambios de sesión ────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  usuarioActual.value = user

  if (user) {
    // Intentar leer rol desde Firestore
    try {
      const snap = await getDoc(doc(db, 'usuarios', user.uid))
      if (snap.exists()) {
        rolActual.value = snap.data().rol || 'cliente'
      } else {
        // Crear documento de usuario si no existe
        const rol = ADMIN_EMAILS.includes(user.email) ? 'admin' : 'cliente'
        await setDoc(doc(db, 'usuarios', user.uid), {
          email:    user.email,
          nombre:   user.displayName || '',
          rol,
          creadoEn: serverTimestamp(),
        })
        rolActual.value = rol
      }
    } catch (e) {
      console.error('[useAuth] error leyendo rol:', e)
      // Fallback: si el email está en la lista, es admin
      rolActual.value = ADMIN_EMAILS.includes(user.email) ? 'admin' : 'cliente'
    }
  } else {
    rolActual.value = null
  }

  cargandoAuth.value = false
})

// ── Login ────────────────────────────────────────────────────
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// ── Registro ─────────────────────────────────────────────────
export const register = async (email, password, nombre) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName: nombre })
  // Crear doc en Firestore
  await setDoc(doc(db, 'usuarios', cred.user.uid), {
    email, nombre, rol: 'cliente', creadoEn: serverTimestamp(),
  })
  return cred
}

// ── Logout ───────────────────────────────────────────────────
export const logout = () => signOut(auth)

// ── Computed helpers ─────────────────────────────────────────
export const esAdmin    = computed(() =>
  rolActual.value === 'admin' || rolActual.value === 'subadmin'
)
export const esLogueado = computed(() => !!usuarioActual.value)

export { usuarioActual, rolActual, cargandoAuth }