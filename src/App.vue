<template>
  <Navbar />

  <div class="min-h-screen bg-pink-50 pt-24 pb-12 px-4">
    
    <div class="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-pink-100 min-h-[80vh] p-6 md:p-10">
      
      <router-view />
      
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
/* Estilos globales para que el rosa ocupe toda la pantalla */
body {
  margin: 0;
  padding: 0;
  background-color: #fdf2f8; /* Un rosa muy clarito (pink-50) */
}
</style>