<template>
  <div id="app">
    <h1>🌸 FLWRSTORE - Panel de Control 🌸</h1>
    <p>Estado de la conexión: <strong>{{ status }}</strong></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from './firebase'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from 'firebase/firestore';

const status = ref('Cargando...');

onMounted(async () => {
  try {
    // Intentamos leer cualquier cosa de una colección (aunque no exista)
    await getDocs(collection(db, 'test'));
    status.value = '¡CONEXIÓN EXITOSA! 🔥';
  } catch (error) {
    console.error("Error detallado:", error);
    status.value = 'Error de conexión: ' + error.message;
  }
});
</script>

<style>
#app {
  font-family: sans-serif;
  text-align: center;
  margin-top: 50px;
  color: #2c3e50;
}
</style>