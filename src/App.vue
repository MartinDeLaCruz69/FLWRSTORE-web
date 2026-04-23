<template>
  <SplashScreen />
  <Navbar />
  <main class="main-content">
    <RouterView />
  </main>
  <!-- Footer no aparece en login ni signup -->
  <Footer v-if="!isAuthPage" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isAuthPage = computed(() =>
  ['/login', '/signup'].includes(route.path)
)
</script>

<style>
.main-content {
  padding-top: 70px;
}
</style>