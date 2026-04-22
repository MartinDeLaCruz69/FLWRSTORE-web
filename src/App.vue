import { onMounted } from 'vue'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

onMounted(async () => {
  console.log("Intentando conectar...") // Esto debe salir primero
  try {
    const querySnapshot = await getDocs(collection(db, "test"))
    if (querySnapshot.empty) {
      console.log("Conectado, pero la colección 'test' está vacía 😶")
    } else {
      console.log("¡CONEXIÓN EXITOSA! 🔥")
      querySnapshot.forEach((doc) => {
        console.log("Datos encontrados:", doc.data())
      })
    }
  } catch (error) {
    console.error("Error real de conexión:", error.message)
  }
})