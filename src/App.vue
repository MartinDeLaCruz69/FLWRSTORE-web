<template>
  <div id="app-wrapper">
    <SplashScreen v-if="mostrando" @done="mostrando = false" />

    <template v-if="!mostrando">
      <Navbar />
      <main class="main-content">
        <RouterView />
      </main>
      <Footer />
    </template>

    <Transition name="scroll-btn">
      <button
        v-if="showScrollTop && !mostrando"
        class="scroll-top"
        @click="scrollToTop"
        title="Volver arriba"
      >
        <span class="scroll-top__icon">🌸</span>
        <span class="scroll-top__arrow">↑</span>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import SplashScreen from "./components/SplashScreen.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { authCargando } from "./composables/useAuth";

const route = useRoute();

const mostrando = ref(true);
let authListo = false;
let tiempoListo = false;

const intentarOcultar = () => {
  if (authListo && tiempoListo) mostrando.value = false;
};

onMounted(() => {
  setTimeout(() => {
    tiempoListo = true;
    intentarOcultar();
  }, 1800);
});

watch(
  authCargando,
  (cargando) => {
    if (!cargando) {
      authListo = true;
      intentarOcultar();
    }
  },
  { immediate: true },
);

const isAuthPage = computed(() => ["/login", "/signup"].includes(route.path));

watch(
  () => route.path,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
);

const showScrollTop = ref(false);
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400;
};
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style>
.main-content {
  padding-top: 70px;
}
.scroll-top {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 90;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(233, 30, 140, 0.35);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}
.scroll-top:hover {
  transform: scale(1.15) translateY(-4px);
  box-shadow: 0 16px 36px rgba(233, 30, 140, 0.45);
}
.scroll-top__icon {
  font-size: 1.3rem;
  display: block;
  animation: petalSpin 4s linear infinite;
  line-height: 1;
}
.scroll-top__arrow {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 1px;
}
@keyframes petalSpin {
  to {
    transform: rotate(360deg);
  }
}

.scroll-btn-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scroll-btn-leave-active {
  transition: all 0.25s ease;
}
.scroll-btn-enter-from {
  opacity: 0;
  transform: scale(0.3) translateY(30px);
}
.scroll-btn-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}
</style>
