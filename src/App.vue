<template>
  <SplashScreen />
  <Navbar />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<script setup>
import SplashScreen from './components/SplashScreen.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
.main-content {
  padding-top: 70px;
}
</style>