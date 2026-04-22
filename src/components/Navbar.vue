<template>
  <nav class="bg-white border-b border-pink-100 fixed w-full z-20 top-0 left-0 shadow-sm">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3">
        <span class="self-center text-2xl font-bold whitespace-nowrap text-pink-500">FLWRSTORE🌸</span>
      </router-link>
      
      <div class="w-full md:block md:w-auto">
        <ul class="font-medium flex flex-row space-x-8 mt-0 border-0 bg-white">
          <li>
            <router-link to="/" class="block py-2 text-gray-700 hover:text-pink-500 transition" active-class="text-pink-600 font-bold">Home</router-link>
          </li>
          <li>
            <router-link to="/stock" class="block py-2 text-gray-700 hover:text-pink-500 transition" active-class="text-pink-600 font-bold">Stock</router-link>
          </li>
          <li>
            <router-link to="/pagos" class="block py-2 text-gray-700 hover:text-pink-500 transition" active-class="text-pink-600 font-bold">Formas de pago</router-link>
          </li>
          <li>
            <router-link to="/perfil" class="flex items-center py-2 text-gray-700 hover:text-pink-500 transition" active-class="text-pink-600 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Perfil
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No necesita lógica de momento
</script>

<style scoped>
/* Estilo opcional para que se vea más profesional */
.router-link-active {
  border-bottom: 2px solid #ec4899; /* Línea rosa bajo el link activo */
}
</style>