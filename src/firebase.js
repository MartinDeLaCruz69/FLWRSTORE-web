import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"; // Importante: usar initializeFirestore

const firebaseConfig = {
  // ... tus credenciales actuales ...
};

const app = initializeApp(firebaseConfig);

// Esta configuración fuerza a Firebase a usar "Long Polling"
// Es como si Firebase hablara por un canal normal de web (puerto 443) 
// que casi todas las empresas tienen abierto.
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db };