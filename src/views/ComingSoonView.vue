<template>
  <div class="coming-soon">
    <div class="coming-soon__bg">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>

    <div class="coming-soon__petals">
      <span v-for="i in 15" :key="i" class="petal" :style="petalStyle(i)">🌸</span>
    </div>

    <div class="coming-soon__content">
      <div class="coming-soon__icon">🌸</div>
      <div class="coming-soon__logo">FLWR 🌸 STORE</div>
      <h1>Próximamente</h1>
      <p>Estamos preparando algo especial para ti.<br>¡Muy pronto abrimos nuestras puertas!</p>

      <div class="countdown">
        <div class="countdown__unit">
          <strong>{{ tiempo.dias }}</strong>
          <span>Días</span>
        </div>
        <div class="countdown__sep">:</div>
        <div class="countdown__unit">
          <strong>{{ tiempo.horas }}</strong>
          <span>Horas</span>
        </div>
        <div class="countdown__sep">:</div>
        <div class="countdown__unit">
          <strong>{{ tiempo.minutos }}</strong>
          <span>Minutos</span>
        </div>
        <div class="countdown__sep">:</div>
        <div class="countdown__unit">
          <strong>{{ tiempo.segundos }}</strong>
          <span>Segundos</span>
        </div>
      </div>

      <div v-if="lanzado" class="countdown__lanzado">
        🎉 ¡Ya abrimos! Bienvenida a FLWRSTORE 🌸
      </div>

      <a
        href="https://www.instagram.com/its.flwr_store"
        target="_blank"
        class="btn-ig"
      >
        📸 Síguenos en Instagram
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'

// ── FECHA DE LANZAMIENTO ─────────────────────────────────────
// Para cambiarla: modifica solo esta línea
// Formato: año, mes (0-11), día, hora, minuto
const FECHA_LANZAMIENTO = new Date(2026, 4, 29, 12, 0, 0) // 29 mayo 2026 12:00pm

const tiempo = ref({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
const lanzado = ref(false)
let confettiLanzado = false
let timer = null

const pad = (n) => String(n).padStart(2, '0')

const calcular = () => {
  const ahora = new Date()
  const diff = FECHA_LANZAMIENTO - ahora

  if (diff <= 0) {
    tiempo.value = { dias: '00', horas: '00', minutos: '00', segundos: '00' }
    lanzado.value = true
    if (!confettiLanzado) {
      confettiLanzado = true
      lanzarConfetti()
    }
    clearInterval(timer)
    return
  }

  const dias     = Math.floor(diff / (1000 * 60 * 60 * 24))
  const horas    = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutos  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((diff % (1000 * 60)) / 1000)

  tiempo.value = {
    dias:     pad(dias),
    horas:    pad(horas),
    minutos:  pad(minutos),
    segundos: pad(segundos),
  }
}

const lanzarConfetti = () => {
  const colores = ['#f48fb1', '#e91e8c', '#fce4ec', '#c2185b', '#fff']
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: colores })
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: colores })
    confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: colores })
  }, 400)
}

const petalStyle = (i) => ({
  '--x':        `${(i * 37) % 100}%`,
  '--delay':    `${(i * 0.5) % 6}s`,
  '--duration': `${6 + (i % 4)}s`,
  '--size':     `${0.8 + (i % 3) * 0.4}rem`,
})

onMounted(() => {
  calcular()
  timer = setInterval(calcular, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.coming-soon {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 24px;
}

.coming-soon__bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4;
  animation: blobFloat 8s ease-in-out infinite alternate;
}
.blob--1 { width: 500px; height: 500px; background: rgba(244,143,177,.35); top: -100px; right: -100px; }
.blob--2 { width: 350px; height: 350px; background: rgba(233,30,140,.12); bottom: -60px; left: -60px; animation-delay: 3s; }
@keyframes blobFloat {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.1) translate(20px,-20px); }
}

.coming-soon__petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.petal {
  position: absolute; left: var(--x); top: -20px;
  font-size: var(--size); opacity: 0;
  animation: petalFall var(--duration) var(--delay) ease-in infinite;
}
@keyframes petalFall {
  0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
  10%  { opacity: 0.5; }
  90%  { opacity: 0.2; }
  100% { opacity: 0; transform: translateY(110vh) rotate(360deg); }
}

.coming-soon__content {
  position: relative; z-index: 2;
  text-align: center;
  display: flex; flex-direction: column;
  align-items: center; gap: 20px;
  max-width: 600px;
}

.coming-soon__icon {
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-14px); }
}

.coming-soon__logo {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
  letter-spacing: 4px;
  color: #c2185b;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

p {
  font-size: 1rem;
  color: #9e6e7e;
  line-height: 1.7;
  margin: 0;
}

.countdown {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1.5px solid rgba(233,30,140,.15);
  border-radius: 24px;
  padding: 24px 32px;
  box-shadow: 0 8px 40px rgba(233,30,140,.12);
  flex-wrap: wrap;
  justify-content: center;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 64px;
}
.countdown__unit strong {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: #e91e8c;
  line-height: 1;
}
.countdown__unit span {
  font-size: 0.7rem;
  color: #9e6e7e;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.countdown__sep {
  font-size: 2rem;
  color: #f48fb1;
  font-weight: 700;
  line-height: 1;
  padding-bottom: 20px;
}

.countdown__lanzado {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(233,30,140,.3);
}

.btn-ig {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366);
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(220,39,67,.3);
  transition: all 0.3s;
}
.btn-ig:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(220,39,67,.4); }

@media (max-width: 480px) {
  .countdown { padding: 18px 16px; gap: 6px; }
  .countdown__unit { min-width: 52px; }
  .countdown__sep { font-size: 1.4rem; padding-bottom: 16px; }
  p { font-size: 0.92rem; }
}
</style>