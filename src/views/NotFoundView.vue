<template>
  <div class="not-found">
    <div class="not-found__bg">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>

    <div class="not-found__petals">
      <span v-for="i in 15" :key="i" class="petal" :style="petalStyle(i)">🌸</span>
    </div>

    <div class="not-found__content">
      <div class="not-found__icon">🌸</div>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>
        Parece que esta página no existe o fue movida.<br>
        ¡Pero hay mucho merch K-Pop esperándote!
      </p>
      <div class="not-found__actions">
        <router-link to="/home" class="btn-primary">
          🏠 Ir al inicio
        </router-link>
        <router-link to="/stock" class="btn-ghost">
          🛍️ Ver Stock disponible
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const petalStyle = (i) => ({
  '--x':        `${(i * 37) % 100}%`,
  '--delay':    `${(i * 0.5) % 6}s`,
  '--duration': `${6 + (i % 4)}s`,
  '--size':     `${0.8 + (i % 3) * 0.4}rem`,
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 24px;
}

/* Blobs de fondo */
.not-found__bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4;
  animation: blobFloat 8s ease-in-out infinite alternate;
}
.blob--1 {
  width: 500px; height: 500px;
  background: rgba(244,143,177,.35);
  top: -100px; right: -100px;
}
.blob--2 {
  width: 350px; height: 350px;
  background: rgba(233,30,140,.12);
  bottom: -60px; left: -60px;
  animation-delay: 3s;
}
@keyframes blobFloat {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.1) translate(20px,-20px); }
}

/* Petals */
.not-found__petals {
  position: absolute; inset: 0;
  pointer-events: none; overflow: hidden; z-index: 0;
}
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

/* Contenido */
.not-found__content {
  position: relative; z-index: 2;
  text-align: center;
  display: flex; flex-direction: column;
  align-items: center; gap: 16px;
  max-width: 480px;
}

.not-found__icon {
  font-size: 5rem;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-16px); }
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(5rem, 20vw, 8rem);
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: #1a1a1a;
  margin: 0;
}

p {
  font-size: 1rem;
  color: #555;
  line-height: 1.7;
  margin: 0;
}

.not-found__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff; border: none;
  padding: 14px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem; font-weight: 600;
  text-decoration: none; cursor: pointer;
  box-shadow: 0 8px 25px rgba(233,30,140,.3);
  transition: all 0.3s;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(233,30,140,.4);
}

.btn-ghost {
  background: transparent;
  color: #c2185b;
  border: 1.5px solid #f48fb1;
  padding: 14px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  text-decoration: none; cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover {
  background: #fce4ec;
  border-color: #e91e8c;
}

/* Mobile */
@media (max-width: 480px) {
  .not-found__actions { flex-direction: column; width: 100%; }
  .btn-primary, .btn-ghost { text-align: center; }
  p { font-size: 0.92rem; }
}
</style>