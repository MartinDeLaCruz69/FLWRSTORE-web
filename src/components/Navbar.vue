<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">

      <!-- Logo -->
      <router-link to="/" class="navbar__logo">
        <span>FLWR</span>
        <span class="navbar__logo-icon">🌸</span>
        <span>STORE</span>
      </router-link>

      <!-- Links desktop -->
      <ul class="navbar__links">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/stock">Stock</router-link></li>
        <li><router-link to="/pagos">Formas de pago</router-link></li>
        <li><router-link to="/legal">Aviso legal</router-link></li>
      </ul>

      <!-- Acciones -->
      <div class="navbar__actions">
        <button class="btn-ghost">Iniciar sesión</button>
        <button class="btn-primary">Registrarse</button>
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
        <router-link to="/" @click="menuOpen = false">Inicio</router-link>
        <router-link to="/stock" @click="menuOpen = false">Stock</router-link>
        <router-link to="/pagos" @click="menuOpen = false">Formas de pago</router-link>
        <router-link to="/legal" @click="menuOpen = false">Aviso legal</router-link>
        <div class="navbar__mobile-actions">
          <button class="btn-ghost">Iniciar sesión</button>
          <button class="btn-primary">Registrarse</button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => { scrolled.value = window.scrollY > 30 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.navbar--scrolled {
  background: rgba(255, 248, 245, 0.85);
  backdrop-filter: blur(16px);
  border-bottom-color: rgba(244, 143, 177, 0.3);
  box-shadow: 0 4px 24px rgba(233, 30, 140, 0.08);
}

.navbar__inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.navbar__logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--pink-deep);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar__logo-icon {
  font-size: 1.2rem;
  display: inline-block;
  transition: transform 0.4s ease;
}
.navbar__logo:hover .navbar__logo-icon {
  transform: rotate(20deg) scale(1.2);
}

.navbar__links {
  display: flex;
  list-style: none;
  gap: 32px;
}
.navbar__links a {
  text-decoration: none;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.2s;
}
.navbar__links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--pink-accent);
  border-radius: 2px;
  transition: width 0.3s ease;
}
.navbar__links a:hover,
.navbar__links a.router-link-active {
  color: var(--pink-accent);
}
.navbar__links a:hover::after,
.navbar__links a.router-link-active::after {
  width: 100%;
}

.navbar__actions {
  display: flex;
  gap: 10px;
}

.btn-ghost {
  background: transparent;
  border: 1.5px solid var(--pink-mid);
  color: var(--pink-deep);
  padding: 8px 18px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover {
  background: var(--pink-soft);
  border-color: var(--pink-accent);
}

.btn-primary {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border: none;
  color: rgb(0, 0, 0);
  padding: 8px 20px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(233, 30, 140, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(233, 30, 140, 0.4);
}

/* Hamburger */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.navbar__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--pink-deep);
  border-radius: 2px;
  transition: all 0.3s;
}
.navbar__burger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger span.open:nth-child(2) { opacity: 0; }
.navbar__burger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
  gap: 16px;
  background: rgba(255, 248, 245, 0.97);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(244, 143, 177, 0.2);
}
.navbar__mobile a {
  text-decoration: none;
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 0;
  border-bottom: 1px solid rgba(244, 143, 177, 0.15);
}
.navbar__mobile-actions {
  display: flex;
  gap: 10px;
  padding-top: 8px;
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .navbar__links, .navbar__actions { display: none; }
  .navbar__burger { display: flex; }
}
</style>