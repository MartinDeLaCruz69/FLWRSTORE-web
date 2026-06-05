<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">
      <router-link to="/" class="navbar__logo">
        <span>FLWR</span>
        <span class="navbar__logo-icon">🌸</span>
        <span>STORE</span>
      </router-link>

      <ul class="navbar__links">
        <li><router-link to="/home">Inicio</router-link></li>
        <li><router-link to="/stock">Stock</router-link></li>
        <li><router-link to="/pagos">Formas de pago</router-link></li>
        <li><router-link to="/legal">Aviso legal</router-link></li>
      </ul>

      <div class="navbar__actions">
        <template v-if="usuarioActual">
          <router-link to="/mis-apartados" class="navbar__user">
            👋 {{ nombreCorto }}
          </router-link>
          <button class="btn-ghost" @click="cerrarSesion">Cerrar sesión</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-ghost"
            >Iniciar sesión</router-link
          >
          <router-link to="/signup" class="btn-primary"
            >Registrarse</router-link
          >
        </template>
      </div>

      <button
        class="navbar__burger"
        @click="menuOpen = !menuOpen"
        aria-label="Menú"
      >
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="navbar__mobile">
        <div v-if="usuarioActual" class="navbar__mobile-user">
          <span>👋</span>
          <div>
            <strong>{{ nombreCorto }}</strong>
            <span>{{ usuarioActual.email }}</span>
          </div>
        </div>

        <router-link to="/home" @click="menuOpen = false"
          >🏠 Inicio</router-link
        >
        <router-link to="/stock" @click="menuOpen = false"
          >🛍️ Stock</router-link
        >
        <router-link to="/pagos" @click="menuOpen = false"
          >💳 Formas de pago</router-link
        >
        <router-link to="/legal" @click="menuOpen = false"
          >📋 Aviso legal</router-link
        >

        <template v-if="usuarioActual">
          <router-link
            to="/mis-apartados"
            class="navbar__mobile-apartados"
            @click="menuOpen = false"
          >
            ⏳ Mis apartados
          </router-link>
          <button class="navbar__mobile-logout" @click="cerrarSesionMobile">
            🚪 Cerrar sesión
          </button>
        </template>

        <div v-else class="navbar__mobile-actions">
          <router-link to="/login" class="btn-ghost" @click="menuOpen = false"
            >Iniciar sesión</router-link
          >
          <router-link
            to="/signup"
            class="btn-primary"
            @click="menuOpen = false"
            >Registrarse</router-link
          >
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usuarioActual, logout } from "../composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const scrolled = ref(false);
const menuOpen = ref(false);

const nombreCorto = computed(() => {
  if (!usuarioActual.value) return ''
  const nombre = usuarioActual.value.displayName || usuarioActual.value.email || ''
  if (!usuarioActual.value.displayName && nombre.includes('@')) return nombre.split('@')[0]
  return nombre.split(' ')[0]
})

const cerrarSesion = async () => {
  await logout();
  router.push("/");
};

const cerrarSesionMobile = async () => {
  menuOpen.value = false;
  await logout();
  router.push("/");
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 30;
};

const handleResize = () => {
  if (window.innerWidth > 768) menuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.main-content {
  padding-top: 70px;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  transition: all 0.4s ease;
  border-bottom: 1px solid transparent;
}
.navbar--scrolled {
  background: rgba(255, 248, 245, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(244, 143, 177, 0.25);
  box-shadow: 0 4px 32px rgba(233, 30, 140, 0.1);
}
.navbar__inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.navbar__logo {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #c2185b;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: letter-spacing 0.3s ease;
  flex-shrink: 0;
}
.navbar__logo:hover {
  letter-spacing: 5px;
}
.navbar__logo-icon {
  font-size: 1.1rem;
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.navbar__logo:hover .navbar__logo-icon {
  transform: rotate(360deg) scale(1.3);
}
.navbar__links {
  display: flex;
  list-style: none;
  gap: 4px;
  padding: 0;
  margin: 0;
}
.navbar__links li a {
  text-decoration: none;
  color: #3d1a26;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 50px;
  position: relative;
  transition: all 0.25s ease;
  display: block;
  white-space: nowrap;
}
.navbar__links li a::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: rgba(233, 30, 140, 0.08);
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
.navbar__links li a::after {
  content: "🌸";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  font-size: 0.55rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.navbar__links li a.router-link-active::after {
  transform: translateX(-50%) scale(1);
}
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.navbar__user {
  font-size: 0.82rem;
  color: #3d1a26;
  font-weight: 500;
  padding: 6px 12px;
  background: rgba(233, 30, 140, 0.07);
  border-radius: 50px;
  border: 1px solid rgba(233, 30, 140, 0.15);
  text-decoration: none;
  white-space: nowrap;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: fadeIn 0.4s ease both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.navbar__actions a {
  text-decoration: none;
}
.btn-ghost {
  background: transparent;
  border: 1.5px solid #f48fb1;
  color: #c2185b;
  padding: 8px 16px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.82rem;
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
  padding: 8px 18px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(233, 30, 140, 0.3);
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(233, 30, 140, 0.4);
}
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: background 0.2s;
  flex-shrink: 0;
}
.navbar__burger:hover {
  background: rgba(233, 30, 140, 0.08);
}
.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #c2185b;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}
.navbar__burger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__burger span.open:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.navbar__burger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 12px 16px 20px;
  gap: 4px;
  background: rgba(255, 248, 245, 0.97);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(244, 143, 177, 0.2);
  box-shadow: 0 16px 40px rgba(233, 30, 140, 0.1);
}
.navbar__mobile-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: linear-gradient(
    135deg,
    rgba(233, 30, 140, 0.08),
    rgba(244, 143, 177, 0.1)
  );
  border-radius: 16px;
  margin-bottom: 8px;
  border: 1px solid rgba(233, 30, 140, 0.15);
}
.navbar__mobile-user span {
  font-size: 1.5rem;
  flex-shrink: 0;
}
.navbar__mobile-user strong {
  display: block;
  font-size: 0.92rem;
  color: #3d1a26;
  font-weight: 600;
}
.navbar__mobile-user > div > span {
  font-size: 0.75rem;
  color: #9e6e7e;
}
.navbar__mobile a {
  text-decoration: none;
  color: #3d1a26;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 13px 16px;
  border-radius: 14px;
  transition: all 0.2s;
  display: block;
}
.navbar__mobile a:hover,
.navbar__mobile a.router-link-active {
  background: rgba(233, 30, 140, 0.08);
  color: #e91e8c;
  padding-left: 22px;
}
.navbar__mobile-apartados {
  background: rgba(233, 30, 140, 0.06) !important;
  border: 1px solid rgba(233, 30, 140, 0.15) !important;
  color: #c2185b !important;
  font-weight: 600 !important;
}
.navbar__mobile-logout {
  background: none;
  border: 1.5px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-family: "DM Sans", sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
  padding: 13px 16px;
  border-radius: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
  width: 100%;
}
.navbar__mobile-logout:hover {
  background: rgba(239, 68, 68, 0.06);
  border-color: #ef4444;
}
.navbar__mobile-actions {
  display: flex;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid rgba(244, 143, 177, 0.15);
  margin-top: 8px;
}
.navbar__mobile-actions .btn-ghost,
.navbar__mobile-actions .btn-primary {
  flex: 1;
  text-align: center;
  justify-content: center;
}
.mobile-menu-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
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

@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
  }
  .navbar__inner {
    height: 60px;
  }
  .navbar__links,
  .navbar__actions {
    display: none;
  }
  .navbar__burger {
    display: flex;
  }
  .navbar__logo {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
}
</style>
