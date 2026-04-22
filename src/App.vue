<template>
  <header>
    <Navbar />
  </header>

  <main class="pt-20"> <router-view />
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>