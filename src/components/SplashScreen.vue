<template>
  <Transition name="splash">
    <div v-if="visible" class="splash">
      <div class="splash__bg"></div>
      <div class="splash__content">
        <div class="splash__petals">
          <span v-for="i in 8" :key="i" class="petal" :style="petalStyle(i)"
            >🌸</span
          >
        </div>
        <div class="splash__logo">
          <span class="logo-text">FLWR</span>
          <span class="logo-icon">🌸</span>
          <span class="logo-text">STORE</span>
        </div>
        <p class="splash__tagline">Tu tienda K-Pop favorita</p>
        <div class="splash__bar">
          <div
            class="splash__progress"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["done"]);
const visible = ref(true);
const progress = ref(0);

const petalStyle = (i) => ({
  "--delay": `${i * 0.15}s`,
  "--angle": `${(i / 8) * 360}deg`,
  "--dist": `${60 + (i % 3) * 25}px`,
});

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += 2;
    if (progress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        visible.value = false;
        setTimeout(() => emit("done"), 600);
      }, 400);
    }
  }, 25);
});
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  overflow: hidden;
}

.splash__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 20% 50%,
      rgba(244, 143, 177, 0.3) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 50%,
      rgba(233, 30, 140, 0.15) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 50% 20%,
      rgba(252, 228, 236, 0.8) 0%,
      transparent 70%
    );
}

.splash__content {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.splash__petals {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.petal {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.4rem;
  opacity: 0;
  animation: floatPetal 2s ease-out var(--delay) forwards;
}

@keyframes floatPetal {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle))
      translateY(calc(var(--dist) * -1));
  }
}

.splash__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  animation: fadeUp 0.8s ease 0.3s both;
}

.logo-text {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  letter-spacing: 6px;
  color: var(--black-dark);
  line-height: 1;
}

.logo-icon {
  font-size: clamp(2rem, 6vw, 3.5rem);
  animation: spin 3s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.splash__tagline {
  font-size: 1rem;
  color: var(--text-light);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 300;
  animation: fadeUp 0.8s ease 0.6s both;
}

.splash__bar {
  width: 200px;
  height: 3px;
  background: var(--pink-soft);
  border-radius: 10px;
  overflow: hidden;
  animation: fadeUp 0.5s ease 0.8s both;
}

.splash__progress {
  height: 100%;
  background: linear-gradient(90deg, var(--pink-mid), var(--pink-accent));
  border-radius: 10px;
  transition: width 0.025s linear;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.splash-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.splash-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
