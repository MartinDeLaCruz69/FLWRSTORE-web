<template>
  <div class="signup-page">
    <!-- Decorativo -->
    <div class="signup-deco">
      <div class="deco__blobs">
        <div class="deco-blob deco-blob--1"></div>
        <div class="deco-blob deco-blob--2"></div>
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
        <p class="deco__tagline">Únete a nuestra<br />comunidad K-Pop</p>
        <div class="deco__perks">
          <div class="perk" v-for="p in perks" :key="p.text">
            <span>{{ p.icon }}</span>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <div class="signup-form-side">
      <div class="signup-form-wrap">
        <div class="form-header">
          <router-link to="/" class="form-back">← Volver al inicio</router-link>
          <div class="form-header__tag">🌸 Nueva cuenta</div>
          <h1>Crear cuenta</h1>
          <p>
            ¿Ya tienes cuenta?
            <router-link to="/login" class="link-pink"
              >Inicia sesión</router-link
            >
          </p>
        </div>

        <!-- Steps indicator -->
        <div class="steps-indicator">
          <div
            v-for="n in 2"
            :key="n"
            class="step-dot"
            :class="{ active: step >= n, done: step > n }"
          >
            <span>{{ step > n ? "✓" : n }}</span>
          </div>
          <div class="steps-line" :class="{ filled: step > 1 }"></div>
        </div>
        <p class="step-label">
          {{ step === 1 ? "Información personal" : "Configura tu acceso" }}
        </p>

        <form class="form" @submit.prevent="handleSubmit" novalidate>
          <!-- STEP 1 -->
          <Transition name="step" mode="out-in">
            <div v-if="step === 1" key="step1" class="step-fields">
              <div
                class="field"
                :class="{
                  'field--error': errors.nombre,
                  'field--ok': fieldOk.nombre,
                }"
              >
                <label>Nombre completo</label>
                <div class="field__input-wrap">
                  <span class="field__icon">👤</span>
                  <input
                    v-model="form.nombre"
                    type="text"
                    placeholder="Tu nombre"
                    @blur="validateNombre"
                  />
                  <span v-if="fieldOk.nombre" class="field__check">✓</span>
                </div>
                <Transition name="err"
                  ><p v-if="errors.nombre" class="field__error">
                    {{ errors.nombre }}
                  </p></Transition
                >
              </div>

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
                  />
                  <span v-if="fieldOk.email" class="field__check">✓</span>
                </div>
                <Transition name="err"
                  ><p v-if="errors.email" class="field__error">
                    {{ errors.email }}
                  </p></Transition
                >
              </div>

              <button type="button" class="btn-submit" @click="goStep2">
                Continuar →
              </button>
            </div>
          </Transition>

          <!-- STEP 2 -->
          <Transition name="step" mode="out-in">
            <div v-if="step === 2" key="step2" class="step-fields">
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
                    placeholder="Mínimo 8 caracteres"
                    @blur="validatePassword"
                  />
                  <button
                    type="button"
                    class="field__eye"
                    @click="showPass = !showPass"
                  >
                    {{ showPass ? "🙈" : "👁️" }}
                  </button>
                </div>

                <!-- Barra de fuerza -->
                <div class="password-strength">
                  <div
                    class="ps-bar"
                    :class="'ps-bar--' + passwordStrength.level"
                    :style="{ width: passwordStrength.pct + '%' }"
                  ></div>
                </div>
                <span
                  class="ps-label"
                  :class="'ps-label--' + passwordStrength.level"
                  >{{ passwordStrength.label }}</span
                >
                <Transition name="err"
                  ><p v-if="errors.password" class="field__error">
                    {{ errors.password }}
                  </p></Transition
                >
              </div>

              <!-- Requisitos de contraseña -->
              <div v-if="form.password" class="pw-requirements">
                <span
                  :class="[
                    'pw-req',
                    form.password.length >= 8 ? 'pw-req--ok' : 'pw-req--no',
                  ]"
                >
                  {{ form.password.length >= 8 ? "✓" : "✕" }} Mínimo 8
                  caracteres
                </span>
                <span
                  :class="[
                    'pw-req',
                    /[A-Z]/.test(form.password) ? 'pw-req--ok' : 'pw-req--no',
                  ]"
                >
                  {{ /[A-Z]/.test(form.password) ? "✓" : "✕" }} Una mayúscula
                </span>
                <span
                  :class="[
                    'pw-req',
                    /[0-9]/.test(form.password) ? 'pw-req--ok' : 'pw-req--no',
                  ]"
                >
                  {{ /[0-9]/.test(form.password) ? "✓" : "✕" }} Un número
                </span>
              </div>

              <div
                class="field"
                :class="{
                  'field--error': errors.confirm,
                  'field--ok': fieldOk.confirm,
                }"
              >
                <label>Confirmar contraseña</label>
                <div class="field__input-wrap">
                  <span class="field__icon">🔐</span>
                  <input
                    v-model="form.confirm"
                    :type="showConfirm ? 'text' : 'password'"
                    placeholder="Repite tu contraseña"
                    @blur="validateConfirm"
                  />
                  <button
                    type="button"
                    class="field__eye"
                    @click="showConfirm = !showConfirm"
                  >
                    {{ showConfirm ? "🙈" : "👁️" }}
                  </button>
                </div>
                <Transition name="err"
                  ><p v-if="errors.confirm" class="field__error">
                    {{ errors.confirm }}
                  </p></Transition
                >
              </div>

              <!-- Términos -->
              <div
                class="terms-row"
                :class="{ 'terms-row--error': errors.terms }"
              >
                <input
                  id="terms"
                  v-model="form.terms"
                  type="checkbox"
                  @change="errors.terms = ''"
                />
                <label for="terms">
                  Acepto los
                  <router-link to="/legal" class="link-pink"
                    >términos y condiciones</router-link
                  >
                  de FLWR STORE
                </label>
              </div>
              <Transition name="err"
                ><p v-if="errors.terms" class="field__error">
                  {{ errors.terms }}
                </p></Transition
              >

              <Transition name="err">
                <div v-if="globalError" class="global-error">
                  ⚠️ {{ globalError }}
                </div>
              </Transition>

              <div class="step2-actions">
                <button type="button" class="btn-back-step" @click="step = 1">
                  ← Atrás
                </button>
                <button
                  type="submit"
                  class="btn-submit btn-submit--flex"
                  :class="{ loading: isLoading }"
                  :disabled="isLoading"
                >
                  <span v-if="!isLoading">Crear cuenta 🌸</span>
                  <span v-else class="spinner"></span>
                </button>
              </div>
            </div>
          </Transition>
        </form>

        <div class="divider"><span>o regístrate con</span></div>

        <button
          class="btn-google"
          @click="handleGoogleLogin"
          :disabled="isLoadingGoogle"
          type="button"
        >
          <span v-if="!isLoadingGoogle" class="btn-google__inner">
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              style="flex-shrink: 0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.7-4.6L2.3 13.3A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8-6.1z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.2 0-11.5-4.2-13.4-9.9l-8 6.2C6.5 42.6 14.6 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Continuar con Google
          </span>
          <span v-else class="spinner spinner--pink"></span>
        </button>

        <p class="form-footer">
          Al registrarte aceptas nuestra
          <router-link to="/legal" class="link-pink"
            >política de privacidad</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { registrar, loginConGoogle } from "../composables/useAuth";

const isLoadingGoogle = ref(false);
const handleGoogleLogin = async () => {
  isLoadingGoogle.value = true;
  globalError.value = "";
  try {
    await loginConGoogle();
    router.push("/");
  } catch (e) {
    const mensajes = {
      "auth/popup-closed-by-user": "Cerraste la ventana de Google.",
      "auth/popup-blocked":
        "Tu navegador bloqueó el popup. Permite ventanas emergentes.",
    };
    globalError.value = mensajes[e.code] || "Error al continuar con Google.";
  } finally {
    isLoadingGoogle.value = false;
  }
};

const router = useRouter();
const step = ref(1);
const showPass = ref(false);
const showConfirm = ref(false);
const isLoading = ref(false);
const globalError = ref("");

const form = reactive({
  nombre: "",
  email: "",
  password: "",
  confirm: "",
  terms: false,
});
const errors = reactive({
  nombre: "",
  email: "",
  password: "",
  confirm: "",
  terms: "",
});
const fieldOk = reactive({
  nombre: false,
  email: false,
  password: false,
  confirm: false,
});

const validateNombre = () => {
  errors.nombre = "";
  fieldOk.nombre = false;
  if (!form.nombre.trim()) {
    errors.nombre = "Tu nombre es obligatorio.";
    return;
  }
  if (form.nombre.trim().length < 3) {
    errors.nombre = "Mínimo 3 caracteres.";
    return;
  }
  fieldOk.nombre = true;
};
const DOMINIOS_BLOQUEADOS_UI = [
  "bltiwd.com",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
  "sharklasers.com",
  "maildrop.cc",
  "dispostable.com",
  "mytemp.email",
  "tempr.email",
  "discard.email",
  "tempinbox.com",
  "emailondeck.com",
  "temp-mail.org",
  "getairmail.com",
  "mailnesia.com",
  "10minutemail.com",
  "spam4.me",
  "trashmail.me",
  "wegwerfmail.de",
  "spambog.com",
];

const emailEsValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) return false;

  const dominio = email.split("@")[1]?.toLowerCase();

  return !DOMINIOS_BLOQUEADOS_UI.includes(dominio);
};

const validateEmail = () => {
  errors.email = "";
  fieldOk.email = false;

  if (!form.email) {
    errors.email = "El correo es obligatorio.";
    return;
  }

  if (!emailEsValido(form.email)) {
    errors.email =
      "Usa un correo personal válido. No se permiten correos temporales.";
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
  if (form.password.length < 8) {
    errors.password = "Mínimo 8 caracteres.";
    return;
  }
  if (!/[A-Z]/.test(form.password)) {
    errors.password = "Incluye al menos una letra mayúscula.";
    return;
  }
  if (!/[0-9]/.test(form.password)) {
    errors.password = "Incluye al menos un número.";
    return;
  }
  fieldOk.password = true;
};
const validateConfirm = () => {
  errors.confirm = "";
  fieldOk.confirm = false;
  if (!form.confirm) {
    errors.confirm = "Confirma tu contraseña.";
    return;
  }
  if (form.confirm !== form.password) {
    errors.confirm = "Las contraseñas no coinciden.";
    return;
  }
  fieldOk.confirm = true;
};

const passwordStrength = computed(() => {
  const p = form.password;
  if (!p) return { level: "", pct: 0, label: "" };

  const tieneMinimo = p.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(p);
  const tieneNumero = /[0-9]/.test(p);
  const tieneSimbolo = /[^A-Za-z0-9]/.test(p);

  const score = [tieneMinimo, tieneMayuscula, tieneNumero, tieneSimbolo].filter(
    Boolean,
  ).length;

  if (p.length < 6) return { level: "weak", pct: 20, label: "🔴 Muy débil" };
  if (score === 1) return { level: "weak", pct: 30, label: "🔴 Débil" };
  if (score === 2) return { level: "fair", pct: 55, label: "🟡 Regular" };
  if (score === 3) return { level: "good", pct: 80, label: "🔵 Buena" };
  return { level: "strong", pct: 100, label: "🟢 Fuerte" };
});

const goStep2 = () => {
  validateNombre();
  validateEmail();
  if (fieldOk.nombre && fieldOk.email) step.value = 2;
};

const handleSubmit = async () => {
  validatePassword();
  validateConfirm();
  if (!form.terms) {
    errors.terms = "Debes aceptar los términos para continuar.";
    return;
  }
  if (errors.password || errors.confirm) return;

  isLoading.value = true;
  globalError.value = "";

  try {
    await registrar(form.nombre.trim(), form.email, form.password);
    router.push("/");
  } catch (e) {
    const mensajes = {
      "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
      "auth/invalid-email": "El formato del correo no es válido.",
      "auth/weak-password":
        "La contraseña es muy débil. Usa al menos 6 caracteres.",
    };
    globalError.value =
      mensajes[e.code] || "Ocurrió un error. Intenta de nuevo.";
    step.value = e.code === "auth/email-already-in-use" ? 1 : 2;
  } finally {
    isLoading.value = false;
  }
};

const perks = [
  { icon: "🌸", text: "Aparta tus productos con tu nombre" },
  { icon: "💬", text: "Mandanos mensaje y realiza el pago" },
  { icon: "📦", text: "Recibe tu pedido en empaque seguro" },
  { icon: "💖", text: "Sé parte de la comunidad FLWRSTORE" },
];

const petalStyle = (i) => ({
  "--x": `${10 + ((i * 9) % 85)}%`,
  "--delay": `${i * 0.7}s`,
  "--duration": `${7 + (i % 4)}s`,
  "--size": `${0.9 + (i % 3) * 0.4}rem`,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap");

.signup-page {
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 0;
  overflow: hidden;
}

/* Deco — mismo que login */
.signup-deco {
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
  width: 280px;
  height: 280px;
  background: rgba(255, 255, 255, 0.4);
  bottom: -40px;
  left: -40px;
  animation-delay: 3s;
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

.deco__perks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 280px;
}
.perk {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 14px;
  padding: 12px 16px;
  text-align: left;
  animation: slideInPerk 0.5s ease both;
}
.perk:nth-child(1) {
  animation-delay: 0.1s;
}
.perk:nth-child(2) {
  animation-delay: 0.2s;
}
.perk:nth-child(3) {
  animation-delay: 0.3s;
}
.perk:nth-child(4) {
  animation-delay: 0.4s;
}
@keyframes slideInPerk {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.perk span {
  font-size: 1.3rem;
  flex-shrink: 0;
}
.perk p {
  font-size: 0.83rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  margin: 0;
}

/* Formulario */
.signup-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  padding: 24px;
  overflow-y: auto;
}
.signup-form-wrap {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 18px;
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

/* Steps */
.steps-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;
}
.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid rgba(233, 30, 140, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-light);
  z-index: 1;
  transition: all 0.35s;
}
.step-dot.active {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(233, 30, 140, 0.3);
}
.step-dot.done {
  background: #22c55e;
  border-color: transparent;
  color: #ffffff;
}
.steps-line {
  flex: 1;
  height: 2px;
  background: rgba(233, 30, 140, 0.15);
  margin: 0 8px;
  transition: background 0.5s;
}
.steps-line.filled {
  background: linear-gradient(90deg, var(--pink-mid), var(--pink-accent));
}
.step-label {
  font-size: 0.78rem;
  color: var(--text-light);
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: -8px;
}

/* Campos */
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.step-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 0.78rem;
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
}
.field__eye {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 2px;
}
.field__error {
  font-size: 0.78rem;
  color: #ef4444;
  padding-left: 4px;
}

/* Password strength */
.password-strength {
  height: 3px;
  background: rgba(233, 30, 140, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 4px;
}
.ps-bar {
  height: 100%;
  border-radius: 10px;
  transition:
    width 0.4s ease,
    background 0.4s;
}
.ps-bar--weak {
  background: #ef4444;
}
.ps-bar--fair {
  background: #f59e0b;
}
.ps-bar--good {
  background: #3b82f6;
}
.ps-bar--strong {
  background: #22c55e;
}
.ps-label {
  font-size: 0.72rem;
  font-weight: 600;
}
.ps-label--weak {
  color: #ef4444;
}
.ps-label--fair {
  color: #b45309;
}
.ps-label--good {
  color: #3b82f6;
}
.ps-label--strong {
  color: #15803d;
}

/* Terms */
.terms-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.terms-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--pink-accent);
  flex-shrink: 0;
  margin-top: 2px;
  cursor: pointer;
}
.terms-row label {
  font-size: 0.82rem;
  color: var(--text-light);
  cursor: pointer;
  line-height: 1.5;
}
.terms-row--error label {
  color: #ef4444;
}

/* Acciones */
.step2-actions {
  display: flex;
  gap: 10px;
}
.btn-back-step {
  background: #ffffff;
  border: 1.5px solid rgba(233, 30, 140, 0.2);
  color: var(--text-light);
  padding: 14px 20px;
  border-radius: 14px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-back-step:hover {
  border-color: var(--pink-mid);
  color: var(--text);
}
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
.btn-submit--flex {
  flex: 1;
  width: auto;
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(233, 30, 140, 0.4);
}
.btn-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
.spinner {
  width: 22px;
  height: 22px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
.spinner--pink {
  border-top-color: #e91e8c;
  border-color: rgba(233, 30, 140, 0.2);
}

.global-error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.85rem;
}

.form-footer {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* Transitions */
.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.err-enter-active,
.err-leave-active {
  transition: all 0.25s ease;
}
.err-enter-from,
.err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .signup-page {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .signup-deco {
    min-height: 200px;
    padding: 70px 20px 24px;
  }
  .deco__content {
    gap: 14px;
    padding: 0;
  }
  .deco__logo {
    font-size: 1.8rem;
    letter-spacing: 4px;
  }
  .deco__tagline {
    font-size: 0.92rem;
  }
  .deco__perks {
    display: none;
  }

  .signup-form-side {
    padding: 24px 16px 48px;
    align-items: flex-start;
  }
  .signup-form-wrap {
    max-width: 100%;
    gap: 14px;
  }
  .form-header h1 {
    font-size: 1.8rem;
  }

  /* Steps */
  .steps-indicator {
    gap: 0;
  }
  .step-dot {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }

  /* Campos */
  .field__input-wrap {
    padding: 11px 14px;
  }
  .btn-submit {
    padding: 14px;
    font-size: 0.95rem;
  }
  .step2-actions {
    flex-direction: column;
    gap: 8px;
  }
  .btn-back-step {
    width: 100%;
    text-align: center;
  }
  .btn-submit--flex {
    width: 100%;
    flex: none;
  }

  /* Terms */
  .terms-row {
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 380px) {
  .signup-deco {
    min-height: 160px;
  }
  .deco__logo {
    font-size: 1.5rem;
  }
}

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
.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid rgba(233, 30, 140, 0.2);
  border-radius: 14px;
  padding: 13px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  width: 100%;
  transition: all 0.25s;
  min-height: 52px;
}
.btn-google:hover:not(:disabled) {
  border-color: var(--pink-mid);
  box-shadow: 0 4px 16px rgba(233, 30, 140, 0.12);
  transform: translateY(-1px);
}
.btn-google:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-google__inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ── Requisitos de contraseña ──────────────────────────────── */
.pw-requirements {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}
.pw-req {
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.2s;
}
.pw-req--ok {
  color: #22c55e;
}
.pw-req--no {
  color: var(--text-light);
}
</style>
