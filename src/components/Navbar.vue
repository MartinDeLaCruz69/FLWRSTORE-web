<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">

      <!-- Logo -->
      <router-link to="/home" class="navbar__logo">
        <span>FLWR</span>
        <span class="navbar__logo-icon">🌸</span>
        <span>STORE</span>
      </router-link>

      <!-- Links desktop -->
      <ul class="navbar__links">
        <li><router-link to="/home">Inicio</router-link></li>
        <li><router-link to="/stock">Stock</router-link></li>
        <li><router-link to="/pagos">Formas de pago</router-link></li>
        <li><router-link to="/legal">Aviso legal</router-link></li>
      </ul>

      <!-- Acciones -->
      <div class="navbar__actions">
        <!-- Si hay sesión activa -->
        <template v-if="usuarioActual">
          <router-link to="/mis-apartados" class="navbar__user">
            👋 {{ usuarioActual.displayName || usuarioActual.email }}
          </router-link>
          <button class="btn-ghost" @click="cerrarSesion">Cerrar sesión</button>
        </template>
        <!-- Si no hay sesión -->
        <template v-else>
          <router-link to="/login"  class="btn-ghost">Iniciar sesión</router-link>
          <router-link to="/signup" class="btn-primary">Registrarse</router-link>
        </template>
      </div>

      <!-- Hamburger mobile -->
      <button class="navbar__burger" @click="menuOpen = !menuOpen">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="navbar__mobile">
        <router-link to="/home" @click="menuOpen = false">Inicio</router-link>
        <router-link to="/stock" @click="menuOpen = false">Stock</router-link>
        <router-link to="/pagos" @click="menuOpen = false">Formas de pago</router-link>
        <router-link to="/legal" @click="menuOpen = false">Aviso legal</router-link>
        <div class="navbar__mobile-actions">
          <router-link to="/login"  class="btn-ghost"  @click="menuOpen = false">Iniciar sesión</router-link>
          <router-link to="/signup" class="btn-primary" @click="menuOpen = false">Registrarse</router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usuarioActual, logout } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const router   = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)

const cerrarSesion = async () => {
  await logout()
  router.push('/')
}

const handleScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ── Base ──────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 24px;
  transition: all 0.4s ease;
  border-bottom: 1px solid transparent;
}

.navbar--scrolled {
  background: rgba(255, 248, 245, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(244, 143, 177, 0.25);
  box-shadow: 0 4px 32px rgba(233, 30, 140, 0.1);
}

/* ── Inner ─────────────────────────────────────────────────── */
.navbar__inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* ── Logo ──────────────────────────────────────────────────── */
.navbar__logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #c2185b;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  transition: letter-spacing 0.3s ease;
}
.navbar__logo:hover { letter-spacing: 6px; }

.navbar__logo-icon {
  font-size: 1.2rem;
  display: inline-block;
  transition: transform 0.5s cubic-bezier(.34,1.56,.64,1);
}
.navbar__logo:hover .navbar__logo-icon {
  transform: rotate(360deg) scale(1.3);
}

/* ── Links ─────────────────────────────────────────────────── */
.navbar__links {
  display: flex;
  list-style: none;
  gap: 8px;
  padding: 0;
  margin: 0;
}

.navbar__links li a {
  text-decoration: none;
  color: #3d1a26;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  padding: 8px 16px;
  border-radius: 50px;
  position: relative;
  transition: all 0.25s ease;
  display: block;
}

.navbar__links li a::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: rgba(233,30,140,.08);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.25s ease;
}
.navbar__links li a:hover::before,
.navbar__links li a.router-link-active::before {
  opacity: 1;
  transform: scale(1);
}
.navbar__links li a:hover {
  color: #e91e8c;
}
.navbar__links li a.router-link-active {
  color: #e91e8c;
  font-weight: 600;
}

/* Indicador animado debajo del link activo */
.navbar__links li a::after {
  content: '🌸';
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  font-size: 0.55rem;
  transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
  line-height: 1;
}
.navbar__links li a.router-link-active::after {
  transform: translateX(-50%) scale(1);
}

/* ── Acciones ───────────────────────────────────────────────── */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar__user {
  font-size: 0.85rem;
  color: #3d1a26;
  font-weight: 500;
  padding: 6px 14px;
  background: rgba(233,30,140,.07);
  border-radius: 50px;
  border: 1px solid rgba(233,30,140,.15);
  animation: fadeIn 0.4s ease both;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

.navbar__actions a,
.navbar__mobile-actions a {
  text-decoration: none;
}

.btn-ghost {
  background: transparent;
  border: 1.5px solid #f48fb1;
  color: #c2185b;
  padding: 8px 18px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}
.btn-ghost:hover {
  background: #fce4ec;
  border-color: #e91e8c;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  border: none;
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(233,30,140,.3);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,.15);
  opacity: 0;
  transition: opacity 0.2s;
}
.btn-primary:hover::after { opacity: 1; }
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(233,30,140,.4);
}

/* ── Hamburger ─────────────────────────────────────────────── */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: background 0.2s;
}
.navbar__burger:hover { background: rgba(233,30,140,.08); }

.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #c2185b;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(.34,1.56,.64,1);
  transform-origin: center;
}
.navbar__burger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger span.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__burger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile menu ───────────────────────────────────────────── */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 12px 20px 24px;
  gap: 4px;
  background: rgba(255, 248, 245, 0.97);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(244, 143, 177, 0.2);
  box-shadow: 0 16px 40px rgba(233,30,140,.1);
}
.navbar__mobile a {
  text-decoration: none;
  color: #3d1a26;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 14px;
  transition: all 0.2s;
}
.navbar__mobile a:hover,
.navbar__mobile a.router-link-active {
  background: rgba(233,30,140,.08);
  color: #e91e8c;
  padding-left: 20px;
}

.navbar__mobile-actions {
  display: flex;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid rgba(244,143,177,.15);
  margin-top: 8px;
}

/* ── Transiciones mobile menu ──────────────────────────────── */
.mobile-menu-enter-active {
  transition: all 0.35s cubic-bezier(.34,1.56,.64,1);
}
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar__links,
  .navbar__actions { display: none; }
  .navbar__burger   { display: flex; }
}
</style>