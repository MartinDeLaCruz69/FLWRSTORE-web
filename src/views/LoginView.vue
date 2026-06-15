<template>
  <div class="login-page">
    <!-- Lado izquierdo — decorativo -->
    <div class="login-deco">
      <div class="deco__blobs">
        <div class="deco-blob deco-blob--1"></div>
        <div class="deco-blob deco-blob--2"></div>
        <div class="deco-blob deco-blob--3"></div>
      </div>

      <div class="deco__petals">
        <span v-for="i in 10" :key="i" class="deco-petal" :style="petalStyle(i)"
          >🌸</span
        >
      </div>

      <div class="deco__content">
        <div class="deco__logo">
          <span>FLWR</span><span class="deco__logo-icon">🌸</span
          ><span>STORE</span>
        </div>
        <p class="deco__tagline">Tu tienda K-Pop<br />de confianza</p>
        <div class="deco__cards">
          <div class="deco__card deco__card--1">
            <span>🎵</span><small>Álbumes</small>
          </div>
          <div class="deco__card deco__card--2">
            <span>📸</span><small>Photocards</small>
          </div>
          <div class="deco__card deco__card--3">
            <span>🧸</span><small>Peluches</small>
          </div>
        </div>
        <div class="deco__stat">
          <strong>+500</strong> pedidos entregados con amor 💖
        </div>
      </div>
    </div>

    <!-- Lado derecho — formulario -->
    <div class="login-form-side">
      <div class="login-form-wrap">
        <!-- Header -->
        <div class="form-header">
          <router-link to="/" class="form-back">← Volver al inicio</router-link>
          <div class="form-header__tag">👋 Bienvenida de vuelta</div>
          <h1>Inicia sesión</h1>
          <p>
            ¿No tienes cuenta?
            <router-link to="/signup" class="link-pink"
              >Regístrate aquí</router-link
            >
          </p>
        </div>

        <!-- Formulario -->
        <form class="form" @submit.prevent="handleLogin" novalidate>
          <!-- Email -->
          <div
            class="field"
            :class="{
              'field--error': errors.email,
              'field--ok': fieldOk.email,
            }"
          >
            <label>Correo electrónico</label>
            <div class="field__input-wrap">
              <span class="field__icon">✉️</span>
              <input
                v-model="form.email"
                type="email"
                placeholder="tu@correo.com"
                @blur="validateEmail"
                autocomplete="email"
              />
              <span v-if="fieldOk.email" class="field__check">✓</span>
            </div>
            <Transition name="err"
              ><p v-if="errors.email" class="field__error">
                {{ errors.email }}
              </p></Transition
            >
          </div>

          <!-- Password -->
          <div
            class="field"
            :class="{
              'field--error': errors.password,
              'field--ok': fieldOk.password,
            }"
          >
            <label>Contraseña</label>
            <div class="field__input-wrap">
              <span class="field__icon">🔒</span>
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Tu contraseña"
                @blur="validatePassword"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="field__eye"
                @click="showPass = !showPass"
              >
                {{ showPass ? "🙈" : "👁️" }}
              </button>
            </div>
            <Transition name="err"
              ><p v-if="errors.password" class="field__error">
                {{ errors.password }}
              </p></Transition
            >
          </div>

          <!-- Olvidé contraseña -->
          <div class="form__forgot">
            <a href="#" class="link-pink" @click.prevent="forgotPassword"
              >¿Olvidaste tu contraseña?</a
            >
          </div>

          <!-- Error global -->
          <Transition name="err">
            <div v-if="globalError" class="global-error">
              ⚠️ {{ globalError }}
            </div>
          </Transition>

          <!-- Botón -->
          <button
            type="submit"
            class="btn-submit"
            :class="{ loading: isLoading }"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Iniciar sesión 🌸</span>
            <span v-else class="spinner"></span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider"><span>o continúa con</span></div>

        <!-- Social login (próximamente Google) -->
        <button class="btn-google" disabled>
          <span>🔍</span> Google — <small>Próximamente</small>
        </button>

        <!-- Footer -->
        <p class="form-footer">
          Al iniciar sesión aceptas nuestros
          <router-link to="/legal" class="link-pink"
            >Términos y condiciones</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login, recuperarPassword, loginConGoogle } from "../composables/useAuth";

const router = useRouter();
const showPass = ref(false);
const isLoading = ref(false);
const globalError = ref("");

const form = reactive({ email: "", password: "" });
const errors = reactive({ email: "", password: "" });
const fieldOk = reactive({ email: false, password: false });

const validateEmail = () => {
  errors.email = "";
  fieldOk.email = false;
  if (!form.email) {
    errors.email = "El correo es obligatorio.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresa un correo válido.";
    return;
  }
  fieldOk.email = true;
};

const validatePassword = () => {
  errors.password = "";
  fieldOk.password = false;
  if (!form.password) {
    errors.password = "La contraseña es obligatoria.";
    return;
  }
  if (form.password.length < 6) {
    errors.password = "Mínimo 6 caracteres.";
    return;
  }
  fieldOk.password = true;
};

const handleLogin = async () => {
  validateEmail();
  validatePassword();
  if (errors.email || errors.password) return;

  isLoading.value = true;
  globalError.value = "";

  try {
    await login(form.email, form.password);
    router.push("/");
  } catch (e) {
    const mensajes = {
      "auth/user-not-found": "No existe una cuenta con ese correo.",
      "auth/wrong-password": "Contraseña incorrecta. Intenta de nuevo.",
      "auth/invalid-email": "El formato del correo no es válido.",
      "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
      "auth/invalid-credential": "Correo o contraseña incorrectos.",
    };
    globalError.value =
      mensajes[e.code] || "Ocurrió un error. Intenta de nuevo.";
  } finally {
    isLoading.value = false;
  }
};

const forgotPassword = async () => {
  if (!form.email) {
    errors.email = "Escribe tu correo primero para recuperar tu contraseña.";
    return;
  }
  try {
    await recuperarPassword(form.email);
    globalError.value = "";
    alert("✅ Te enviamos un correo para recuperar tu contraseña 🌸");
  } catch (e) {
    globalError.value = "No encontramos una cuenta con ese correo.";
  }
};

const isLoadingGoogle = ref(false)
const handleGoogleLogin = async () => {
  isLoadingGoogle.value = true
  globalError.value = ""
  try {
    await loginConGoogle()
    router.push("/")
  } catch (e) {
    const mensajes = {
      "auth/popup-closed-by-user": "Cerraste la ventana de Google. Intenta de nuevo.",
      "auth/cancelled-popup-request": "",
      "auth/popup-blocked": "Tu navegador bloqueó el popup. Permite ventanas emergentes e intenta de nuevo.",
    }
    globalError.value = mensajes[e.code] || "Error al iniciar con Google. Intenta de nuevo."
  } finally {
    isLoadingGoogle.value = false
  }
}

const petalStyle = (i) => ({
  "--x": `${10 + ((i * 9) % 85)}%`,
  "--delay": `${i * 0.7}s`,
  "--duration": `${7 + (i % 4)}s`,
  "--size": `${0.9 + (i % 3) * 0.4}rem`,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap");

/* ── Layout split ──────────────────────────────────────────── */
.login-page {
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 0;
  overflow: hidden;
}

/* ── Lado decorativo ───────────────────────────────────────── */
.login-deco {
  position: relative;
  background: linear-gradient(160deg, #fce4ec 0%, #f8bbd9 50%, #f48fb1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 70px;
}

.deco__blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.deco-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.5;
  animation: blobDrift 9s ease-in-out infinite alternate;
}
.deco-blob--1 {
  width: 400px;
  height: 400px;
  background: rgba(233, 30, 140, 0.3);
  top: -80px;
  right: -80px;
}
.deco-blob--2 {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.4);
  bottom: -40px;
  left: -40px;
  animation-delay: 3s;
}
.deco-blob--3 {
  width: 200px;
  height: 200px;
  background: rgba(194, 24, 91, 0.25);
  top: 50%;
  left: 20%;
  animation-delay: 6s;
}
@keyframes blobDrift {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.1) translate(15px, -20px);
  }
}

.deco__petals {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.deco-petal {
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
    opacity: 0.7;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translateY(105vh) rotate(360deg);
  }
}

.deco__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
  padding: 40px 32px;
}

.deco__logo {
  font-family: "Playfair Display", serif;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  text-shadow: 0 4px 20px rgba(194, 24, 91, 0.3);
}
.deco__logo-icon {
  display: inline-block;
  animation: spin 5s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.deco__tagline {
  font-family: "Playfair Display", serif;
  font-style: italic;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

.deco__cards {
  display: flex;
  gap: 14px;
}
.deco__card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 18px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
}
.deco__card:hover {
  transform: translateY(-8px) scale(1.05);
}
.deco__card span {
  font-size: 2rem;
}
.deco__card small {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  letter-spacing: 0.5px;
}
.deco__card--1 {
  animation: floatCard 4s ease-in-out infinite;
}
.deco__card--2 {
  animation: floatCard 4s ease-in-out 0.8s infinite;
}
.deco__card--3 {
  animation: floatCard 4s ease-in-out 1.6s infinite;
}
@keyframes floatCard {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.deco__stat {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50px;
  padding: 10px 22px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}
.deco__stat strong {
  font-size: 1.1rem;
  color: #fff;
}

/* ── Formulario ────────────────────────────────────────────── */
.login-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  padding: 24px;
  overflow-y: auto;
}

.login-form-wrap {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: formIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes formIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.form-back {
  font-size: 0.82rem;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block;
}
.form-back:hover {
  color: var(--pink-accent);
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-header__tag {
  display: inline-block;
  background: rgba(233, 30, 140, 0.1);
  color: var(--pink-deep);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 50px;
  width: fit-content;
}
.form-header h1 {
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  color: var(--text);
  line-height: 1.1;
}
.form-header p {
  font-size: 0.9rem;
  color: var(--text-light);
}
.link-pink {
  color: var(--pink-accent);
  text-decoration: none;
  font-weight: 600;
}
.link-pink:hover {
  text-decoration: underline;
}

/* ── Campos ────────────────────────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-light);
}

.field__input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid rgba(233, 30, 140, 0.2);
  border-radius: 14px;
  padding: 12px 16px;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}
.field__input-wrap:focus-within {
  border-color: var(--pink-accent);
  box-shadow: 0 0 0 4px rgba(233, 30, 140, 0.08);
}
.field--ok .field__input-wrap {
  border-color: #22c55e;
}
.field--error .field__input-wrap {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.07);
}

.field__icon {
  font-size: 1rem;
  flex-shrink: 0;
}
.field__input-wrap input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "DM Sans", sans-serif;
  font-size: 0.92rem;
  color: var(--text);
}
.field__input-wrap input::placeholder {
  color: var(--text-light);
}
.field__check {
  color: #22c55e;
  font-size: 0.9rem;
  font-weight: 700;
  flex-shrink: 0;
}
.field__eye {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 2px;
  flex-shrink: 0;
}
.field__error {
  font-size: 0.78rem;
  color: #ef4444;
  padding-left: 4px;
}

/* ── Olvidé contraseña ─────────────────────────────────────── */
.form__forgot {
  text-align: right;
  margin-top: -6px;
}
.form__forgot a {
  font-size: 0.82rem;
}

/* ── Error global ──────────────────────────────────────────── */
.global-error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.85rem;
  line-height: 1.5;
}

/* ── Botón submit ──────────────────────────────────────────── */
.btn-submit {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #ffffff;
  border: none;
  padding: 15px;
  border-radius: 14px;
  width: 100%;
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 28px rgba(233, 30, 140, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(233, 30, 140, 0.4);
}
.btn-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
.btn-submit.loading {
  pointer-events: none;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

/* ── Divider ───────────────────────────────────────────────── */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-light);
  font-size: 0.8rem;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(233, 30, 140, 0.15);
}

/* ── Google btn ────────────────────────────────────────────── */
.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid rgba(233, 30, 140, 0.15);
  border-radius: 14px;
  padding: 13px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  color: var(--text-light);
  cursor: not-allowed;
  width: 100%;
  transition: all 0.2s;
}
.btn-google small {
  font-size: 0.75rem;
}

/* ── Footer ────────────────────────────────────────────────── */
.form-footer {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* ── Transiciones ──────────────────────────────────────────── */
.err-enter-active,
.err-leave-active {
  transition: all 0.25s ease;
}
.err-enter-from,
.err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  /* Layout vertical en mobile */
  .login-page {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  /* Deco reducido arriba */
  .login-deco {
    min-height: 220px;
    padding: 70px 20px 28px;
  }
  .deco__content {
    gap: 16px;
    padding: 0;
  }
  .deco__logo {
    font-size: 1.8rem;
    letter-spacing: 4px;
  }
  .deco__tagline {
    font-size: 0.95rem;
  }
  .deco__cards {
    gap: 8px;
  }
  .deco__card {
    padding: 12px 10px;
  }
  .deco__card span {
    font-size: 1.5rem;
  }
  .deco__card small {
    font-size: 0.65rem;
  }
  .deco__stat {
    font-size: 0.78rem;
    padding: 8px 16px;
  }

  /* Formulario */
  .login-form-side {
    padding: 28px 16px 48px;
    align-items: flex-start;
  }
  .login-form-wrap {
    max-width: 100%;
    gap: 16px;
  }
  .form-header h1 {
    font-size: 1.8rem;
  }
  .field__input-wrap {
    padding: 11px 14px;
  }
  .btn-submit {
    padding: 14px;
    font-size: 0.95rem;
  }
}

@media (max-width: 380px) {
  .deco__cards {
    gap: 6px;
  }
  .deco__card {
    padding: 10px 8px;
  }
  .login-deco {
    min-height: 180px;
  }
}
</style>
