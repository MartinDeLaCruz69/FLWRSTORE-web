<template>
  <div class="coming-soon">
    <div class="coming-soon__bg">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>

    <div class="coming-soon__petals">
      <span v-for="i in 15" :key="i" class="petal" :style="petalStyle(i)"
        >🌸</span
      >
    </div>

    <div class="coming-soon__content">
      <div class="coming-soon__icon">🌸</div>
      <div class="coming-soon__logo">FLWR 🌸 STORE</div>

      <template v-if="!lanzado">
        <h1>Próximamente</h1>
        <p>
          Estamos preparando algo especial para ti.<br />¡Muy pronto abrimos
          nuestras puertas!
        </p>

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
      </template>

      <template v-else>
        <h1>¡Ya abrimos!</h1>
        <p>
          Gracias por tu espera. Bienvenida(o) a
          <strong>FLWR🌸STORE</strong>,<br />tu tienda K-Pop de confianza.
        </p>

        <div class="countdown__lanzado">🌸 ¡La tienda ya está disponible!</div>

        <button @click="entrarTienda" class="btn-entrar">
          ✨ Entrar a la tienda
        </button>
        <br />

        <p class="redirigiendo" v-if="segundosRedireccion > 0">
          Redirigiendo automáticamente en {{ segundosRedireccion }}s...
        </p>
      </template>

      <a
        href="https://www.instagram.com/its.flwr_store"
        target="_blank"
        class="btn-ig"
      >
        📸 Síguenos en Instagram
      </a>
      <div class="beta-badge">
        ⚠️ Versión Beta ⚠️ <br />
        Este sitio estará en constante desarrollo através de actualizaciones.
        <br />
        ¡Gracias por su comprensión!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import confetti from "canvas-confetti";

const router = useRouter();

// ── FECHAS CLAVE ─────────────────────────────────────────────
const FECHA_LANZAMIENTO = new Date(2026, 4, 29, 12, 0, 0);
const FECHA_FIN_COMING_SOON = new Date(2026, 5, 1, 12, 0, 0);

const tiempo = ref({ dias: "00", horas: "00", minutos: "00", segundos: "00" });
const lanzado = ref(false);
const segundosRedireccion = ref(20);
let confettiLanzado = false;
let timer = null;
let timerRedireccion = null;

const pad = (n) => String(n).padStart(2, "0");

let confettiInterval = null;

const ejecutarConfetti = () => {
  const colores = ["#f48fb1", "#e91e8c", "#fce4ec", "#c2185b", "#fff"];

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: colores,
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: colores,
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: colores,
    });
  }, 400);
};

const lanzarConfetti = () => {
  if (confettiInterval) return;

  ejecutarConfetti();

  confettiInterval = setInterval(() => {
    ejecutarConfetti();
  }, 5000);
};

const detenerConfetti = () => {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }
};

const entrarTienda = () => {
  detenerConfetti();

  clearInterval(timerRedireccion);
  clearInterval(timer);

  router.push("/home");
};

const iniciarRedireccion = () => {
  timerRedireccion = setInterval(() => {
    segundosRedireccion.value--;

    if (segundosRedireccion.value === 5) {
      detenerConfetti();
    }

    if (segundosRedireccion.value <= 0) {
      clearInterval(timerRedireccion);

      detenerConfetti();

      router.push("/home");
    }
  }, 1000);
};

const calcular = () => {
  const ahora = new Date();

  if (ahora >= FECHA_FIN_COMING_SOON) {
    router.push("/home");
    return;
  }

  const diff = FECHA_LANZAMIENTO - ahora;

  if (diff <= 0) {
    tiempo.value = { dias: "00", horas: "00", minutos: "00", segundos: "00" };
    if (!lanzado.value) {
      lanzado.value = true;
      clearInterval(timer);
      if (!confettiLanzado) {
        confettiLanzado = true;
        lanzarConfetti();
      }
      iniciarRedireccion();
    }
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  tiempo.value = {
    dias: pad(dias),
    horas: pad(horas),
    minutos: pad(minutos),
    segundos: pad(segundos),
  };
};

const petalStyle = (i) => ({
  "--x": `${(i * 37) % 100}%`,
  "--delay": `${(i * 0.5) % 6}s`,
  "--duration": `${6 + (i % 4)}s`,
  "--size": `${0.8 + (i % 3) * 0.4}rem`,
});

onMounted(() => {
  calcular();
  timer = setInterval(calcular, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
  clearInterval(timerRedireccion);
  detenerConfetti();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap");

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

.beta-badge {
  position: relative;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(233, 30, 140, 0.12);
  color: #000000d8;

  padding: 10px 20px;
  border-radius: 999px;

  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.5px;

  backdrop-filter: blur(12px);

  box-shadow:
    0 4px 18px rgba(233, 30, 140, 0.08),
    0 0 0 rgba(233, 30, 140, 0);

  animation: betaGlow 3.5s ease-in-out infinite;

  transition: box-shadow 0.3s ease;
}

.beta-badge::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 80%
  );

  transform: translateX(-120%);
  animation: shine 4.5s linear infinite;
}

.beta-badge:hover {
  box-shadow:
    0 10px 30px rgba(233, 30, 140, 0.16),
    0 0 24px rgba(244, 143, 177, 0.22);
}

@keyframes betaGlow {
  0%,
  100% {
    box-shadow:
      0 4px 18px rgba(233, 30, 140, 0.08),
      0 0 0 rgba(233, 30, 140, 0);
  }

  50% {
    box-shadow:
      0 10px 28px rgba(233, 30, 140, 0.16),
      0 0 18px rgba(244, 143, 177, 0.18);
  }
}

@keyframes shine {
  100% {
    transform: translateX(120%);
  }
}

.coming-soon__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: blobFloat 8s ease-in-out infinite alternate;
}
.blob--1 {
  width: 500px;
  height: 500px;
  background: rgba(244, 143, 177, 0.35);
  top: -100px;
  right: -100px;
}
.blob--2 {
  width: 350px;
  height: 350px;
  background: rgba(233, 30, 140, 0.12);
  bottom: -60px;
  left: -60px;
  animation-delay: 3s;
}
@keyframes blobFloat {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.1) translate(20px, -20px);
  }
}

.coming-soon__petals {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.petal {
  position: absolute;
  left: var(--x);
  top: -20px;
  font-size: var(--size);
  opacity: 0;
  animation: petalFall var(--duration) var(--delay) ease-in infinite;
}
@keyframes petalFall {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
    transform: translateY(110vh) rotate(360deg);
  }
}

.coming-soon__content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 600px;
}

.coming-soon__icon {
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.coming-soon__logo {
  font-family: "Playfair Display", serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
  letter-spacing: 4px;
  color: #c2185b;
}

h1 {
  font-family: "Playfair Display", serif;
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
  border: 1.5px solid rgba(233, 30, 140, 0.15);
  border-radius: 24px;
  padding: 24px 32px;
  box-shadow: 0 8px 40px rgba(233, 30, 140, 0.12);
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
  font-family: "Playfair Display", serif;
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
  box-shadow: 0 8px 25px rgba(233, 30, 140, 0.3);
}

.btn-entrar {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(233, 30, 140, 0.35);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: pulseBtn 2s ease-in-out infinite;
}
.btn-entrar:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 16px 40px rgba(233, 30, 140, 0.45);
}
@keyframes pulseBtn {
  0%,
  100% {
    box-shadow: 0 8px 25px rgba(233, 30, 140, 0.35);
  }
  50% {
    box-shadow: 0 8px 40px rgba(233, 30, 140, 0.6);
  }
}

.redirigiendo {
  font-size: 0.82rem;
  color: #c2185b;
  opacity: 0.7;
  margin-top: -8px;
}

.btn-ig {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366);
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(220, 39, 67, 0.3);
  transition: all 0.3s;
}
.btn-ig:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(220, 39, 67, 0.4);
}

@media (max-width: 480px) {
  .countdown {
    padding: 18px 16px;
    gap: 6px;
  }
  .countdown__unit {
    min-width: 52px;
  }
  .countdown__sep {
    font-size: 1.4rem;
    padding-bottom: 16px;
  }
  p {
    font-size: 0.92rem;
  }
  .btn-entrar {
    padding: 14px 28px;
    font-size: 0.95rem;
  }
}
</style>
