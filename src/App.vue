<template>
  <div id="app-wrapper">

    <!-- ══ SPLASH SCREEN ══ -->
    <Transition name="splash">
      <div v-if="mostrando" class="splash">
        <div class="splash__bg">
          <div class="splash__blob splash__blob--1"></div>
          <div class="splash__blob splash__blob--2"></div>
        </div>
        <div class="splash__petals">
          <span v-for="i in 12" :key="i" class="splash__petal" :style="petalStyle(i)">🌸</span>
        </div>
        <div class="splash__content">
          <div class="splash__logo">
            FLWR<span class="splash__logo-icon">🌸</span>STORE
          </div>
          <p class="splash__sub">Tu tienda K-Pop de confianza</p>
          <div class="splash__dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ APP NORMAL ══ -->
    <template v-if="!mostrando">
      <Navbar />
      <RouterView />
      <Footer />
    </template>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { authCargando } from './composables/useAuth'

const mostrando = ref(true)

let authListo = false
let tiempoListo = false

const intentarOcultar = () => {
  if (authListo && tiempoListo) {
    mostrando.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    tiempoListo = true
    intentarOcultar()
  }, 1800)
})

watch(authCargando, (cargando) => {
  if (!cargando) {
    authListo = true
    intentarOcultar()
  }
}, { immediate: true })

// Petals del splash
const petalStyle = (i) => ({
  '--x':        `${(i * 37) % 100}%`,
  '--delay':    `${(i * 0.5) % 5}s`,
  '--duration': `${5 + (i % 4)}s`,
  '--size':     `${0.8 + (i % 3) * 0.3}rem`,
})
</script>

<style>
/* ══ SPLASH SCREEN ════════════════════════════════════════ */
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash__bg {
  position: absolute; inset: 0;
  pointer-events: none;
}
.splash__blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.45;
  animation: splashBlob 6s ease-in-out infinite alternate;
}
.splash__blob--1 {
  width: 500px; height: 500px;
  background: rgba(244,143,177,.4);
  top: -150px; right: -100px;
}
.splash__blob--2 {
  width: 350px; height: 350px;
  background: rgba(233,30,140,.15);
  bottom: -80px; left: -60px;
  animation-delay: 2s;
}
@keyframes splashBlob {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.15) translate(20px,-20px); }
}

.splash__petals {
  position: absolute; inset: 0;
  pointer-events: none; overflow: hidden;
}
.splash__petal {
  position: absolute; left: var(--x); top: -20px;
  font-size: var(--size); opacity: 0;
  animation: splashPetal var(--duration) var(--delay) ease-in infinite;
}
@keyframes splashPetal {
  0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.2; }
  100% { opacity: 0; transform: translateY(110vh) rotate(360deg); }
}

.splash__content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  align-items: center; gap: 12px;
  text-align: center;
}

.splash__logo {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 4px;
  color: #c2185b;
  display: flex; align-items: center; gap: 6px;
  animation: splashLogoIn 0.8s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes splashLogoIn {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to   { opacity: 1; transform: none; }
}

.splash__logo-icon {
  display: inline-block;
  animation: splashSpin 3s linear infinite;
}
@keyframes splashSpin { to { transform: rotate(360deg); } }

.splash__sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #9e6e7e;
  letter-spacing: 0.5px;
  animation: splashFadeIn 0.8s 0.3s ease both;
}
@keyframes splashFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

/* Dots de carga */
.splash__dots {
  display: flex; gap: 8px;
  margin-top: 8px;
  animation: splashFadeIn 0.8s 0.6s ease both;
}
.splash__dots span {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #f48fb1;
  animation: dotBounce 1.2s ease-in-out infinite;
}
.splash__dots span:nth-child(2) { animation-delay: 0.2s; }
.splash__dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotBounce {
  0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
  40%         { transform: scale(1.2); opacity: 1; }
}

/* Transición de salida del splash */
.splash-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.splash-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>