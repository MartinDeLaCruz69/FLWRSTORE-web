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
  try {
    if (user) {
      const snap = await getDoc(doc(db, "usuarios", user.uid));
      const datosFirestore = snap.exists() ? snap.data() : null;

      if (!user.displayName && datosFirestore?.nombre) {
        await updateProfile(user, {
          displayName: datosFirestore.nombre,
        });

        await user.reload();
      }

      usuarioActual.value = auth.currentUser;
      rolActual.value = datosFirestore?.rol ?? "cliente";
    } else {
      usuarioActual.value = null;
      rolActual.value = null;
    }
  } catch (error) {
    console.error("Error en onAuthStateChanged:", error);

    usuarioActual.value = user ?? null;
    rolActual.value = null;
  } finally {
    authCargando.value = false;
  }
});

const DOMINIOS_BLOQUEADOS = [
  "bltiwd.com",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "spam4.me",
  "maildrop.cc",
  "dispostable.com",
  "spamgourmet.com",
  "mytemp.email",
  "tempr.email",
  "discard.email",
  "tempinbox.com",
  "emailondeck.com",
  "temp-mail.org",
  "getairmail.com",
  "mailnull.com",
  "spamspot.com",
  "trashmail.me",
  "wegwerfmail.de",
  "spambog.com",
  "notmailinator.com",
  "mailnesia.com",
  "10minutemail.com",
  "10minemail.com",
  "anonbox.net",
];

const validarEmail = (email) => {
  const dominio = email.split("@")[1]?.toLowerCase();
  if (!dominio) throw new Error("Correo electrónico inválido.");
  if (DOMINIOS_BLOQUEADOS.includes(dominio)) {
    throw new Error(
      "No se permiten correos temporales o desechables. Usa tu correo personal.",
    );
  }
  if (!dominio.includes(".") || dominio.split(".").pop().length < 2) {
    throw new Error("Correo electrónico inválido.");
  }
};

export const registrar = async (nombre, email, password) => {
  validarEmail(email);
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, { displayName: nombre });
  await setDoc(doc(db, "usuarios", user.uid), {
    nombre,
    email,
    rol: "cliente",
    notificaciones: false,
    creadoEn: new Date(),
  });
  await user.reload();
  usuarioActual.value = auth.currentUser;
  return auth.currentUser;
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
      notificaciones: false,
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
