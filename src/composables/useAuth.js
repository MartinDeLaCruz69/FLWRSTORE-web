import { ref } from 'vue'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

// Estado global reactivo del usuario
export const usuarioActual = ref(null)
export const rolActual     = ref(null)
export const authCargando  = ref(true)

// Escucha cambios de sesión en toda la app
onAuthStateChanged(auth, async (user) => {
  if (user) {
    usuarioActual.value = user
    // Obtener rol desde Firestore
    const snap = await getDoc(doc(db, 'usuarios', user.uid))
    rolActual.value = snap.exists() ? snap.data().rol : 'cliente'
  } else {
    usuarioActual.value = null
    rolActual.value     = null
  }
  authCargando.value = false
})

// ── Registro ─────────────────────────────────────────────────
export const registrar = async (nombre, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // Guarda el perfil en Firestore con rol 'cliente' por defecto
  await setDoc(doc(db, 'usuarios', user.uid), {
    nombre,
    email,
    rol: 'cliente',
    creadoEn: new Date(),
  })

  return user
}

// ── Login ─────────────────────────────────────────────────────
export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

// ── Logout ────────────────────────────────────────────────────
export const logout = async () => {
  await signOut(auth)
}

// ── Recuperar contraseña ──────────────────────────────────────
export const recuperarPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}