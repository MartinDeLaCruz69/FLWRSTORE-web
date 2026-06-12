import { ref } from "vue";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
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
  await updateProfile(user, { displayName: nombre });
  await setDoc(doc(db, "usuarios", user.uid), {
    nombre,
    email,
    rol: "cliente",
    creadoEn: new Date(),
  });
  usuarioActual.value = auth.currentUser;
  return user;
};

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (!user.displayName) {
    const snap = await getDoc(doc(db, "usuarios", user.uid));
    if (snap.exists()) {
      const nombre = snap.data().nombre;
      if (nombre) {
        await updateProfile(user, { displayName: nombre });
        await user.reload();
        usuarioActual.value = auth.currentUser;
      }
    }
  }
  return auth.currentUser;
};

export const loginConGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);

  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (!snap.exists()) {
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: user.displayName || "",
      email: user.email,
      rol: "cliente",
      creadoEn: new Date(),
    });
  }

  usuarioActual.value = auth.currentUser;
  return auth.currentUser;
};

export const logout = async () => {
  await signOut(auth);
};

export const recuperarPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
