import { ref } from "vue";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const usuarioActual = ref(null);
export const rolActual = ref(null);
export const authCargando = ref(true);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    usuarioActual.value = user;
    const snap = await getDoc(doc(db, "usuarios", user.uid));
    rolActual.value = snap.exists() ? snap.data().rol : "cliente";
  } else {
    usuarioActual.value = null;
    rolActual.value = null;
  }
  authCargando.value = false;
});

export const registrar = async (nombre, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "usuarios", user.uid), {
    nombre,
    email,
    rol: "cliente",
    creadoEn: new Date(),
  });

  return user;
};

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const recuperarPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
