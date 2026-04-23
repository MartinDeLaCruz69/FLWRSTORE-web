<template>
  <div class="signup-page">

    <!-- Decorativo -->
    <div class="signup-deco">
      <div class="deco__blobs">
        <div class="deco-blob deco-blob--1"></div>
        <div class="deco-blob deco-blob--2"></div>
      </div>
      <div class="deco__petals">
        <span v-for="i in 10" :key="i" class="deco-petal" :style="petalStyle(i)">🌸</span>
      </div>
      <div class="deco__content">
        <div class="deco__logo">
          <span>FLWR</span><span class="deco__logo-icon">🌸</span><span>STORE</span>
        </div>
        <p class="deco__tagline">Únete a nuestra<br>comunidad K-Pop</p>
        <div class="deco__perks">
          <div class="perk" v-for="p in perks" :key="p.text">
            <span>{{ p.icon }}</span><p>{{ p.text }}</p>
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
          <p>¿Ya tienes cuenta? <router-link to="/login" class="link-pink">Inicia sesión</router-link></p>
        </div>

        <!-- Steps indicator -->
        <div class="steps-indicator">
          <div v-for="n in 2" :key="n" class="step-dot" :class="{ active: step >= n, done: step > n }">
            <span>{{ step > n ? '✓' : n }}</span>
          </div>
          <div class="steps-line" :class="{ filled: step > 1 }"></div>
        </div>
        <p class="step-label">{{ step === 1 ? 'Información personal' : 'Configura tu acceso' }}</p>

        <form class="form" @submit.prevent="handleSubmit" novalidate>

          <!-- STEP 1 -->
          <Transition name="step" mode="out-in">
            <div v-if="step === 1" key="step1" class="step-fields">

              <div class="field" :class="{ 'field--error': errors.nombre, 'field--ok': fieldOk.nombre }">
                <label>Nombre completo</label>
                <div class="field__input-wrap">
                  <span class="field__icon">👤</span>
                  <input v-model="form.nombre" type="text" placeholder="Tu nombre" @blur="validateNombre" />
                  <span v-if="fieldOk.nombre" class="field__check">✓</span>
                </div>
                <Transition name="err"><p v-if="errors.nombre" class="field__error">{{ errors.nombre }}</p></Transition>
              </div>

              <div class="field" :class="{ 'field--error': errors.email, 'field--ok': fieldOk.email }">
                <label>Correo electrónico</label>
                <div class="field__input-wrap">
                  <span class="field__icon">✉️</span>
                  <input v-model="form.email" type="email" placeholder="tu@correo.com" @blur="validateEmail" />
                  <span v-if="fieldOk.email" class="field__check">✓</span>
                </div>
                <Transition name="err"><p v-if="errors.email" class="field__error">{{ errors.email }}</p></Transition>
              </div>

              <button type="button" class="btn-submit" @click="goStep2">
                Continuar →
              </button>

            </div>
          </Transition>

          <!-- STEP 2 -->
          <Transition name="step" mode="out-in">
            <div v-if="step === 2" key="step2" class="step-fields">

              <div class="field" :class="{ 'field--error': errors.password, 'field--ok': fieldOk.password }">
                <label>Contraseña</label>
                <div class="field__input-wrap">
                  <span class="field__icon">🔒</span>
                  <input v-model="form.password" :type="showPass ? 'text' : 'password'" placeholder="Mínimo 6 caracteres" @blur="validatePassword" />
                  <button type="button" class="field__eye" @click="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</button>
                </div>
                <!-- Barra de fuerza -->
                <div class="password-strength">
                  <div class="ps-bar" :class="'ps-bar--' + passwordStrength.level" :style="{ width: passwordStrength.pct + '%' }"></div>
                </div>
                <span class="ps-label" :class="'ps-label--' + passwordStrength.level">{{ passwordStrength.label }}</span>
                <Transition name="err"><p v-if="errors.password" class="field__error">{{ errors.password }}</p></Transition>
              </div>

              <div class="field" :class="{ 'field--error': errors.confirm, 'field--ok': fieldOk.confirm }">
                <label>Confirmar contraseña</label>
                <div class="field__input-wrap">
                  <span class="field__icon">🔐</span>
                  <input v-model="form.confirm" :type="showConfirm ? 'text' : 'password'" placeholder="Repite tu contraseña" @blur="validateConfirm" />
                  <button type="button" class="field__eye" @click="showConfirm = !showConfirm">{{ showConfirm ? '🙈' : '👁️' }}</button>
                </div>
                <Transition name="err"><p v-if="errors.confirm" class="field__error">{{ errors.confirm }}</p></Transition>
              </div>

              <!-- Términos -->
              <div class="terms-row" :class="{ 'terms-row--error': errors.terms }">
                <input id="terms" v-model="form.terms" type="checkbox" @change="errors.terms = ''" />
                <label for="terms">
                  Acepto los <router-link to="/legal" class="link-pink">términos y condiciones</router-link> de FLWR STORE
                </label>
              </div>
              <Transition name="err"><p v-if="errors.terms" class="field__error">{{ errors.terms }}</p></Transition>

              <Transition name="err">
                <div v-if="globalError" class="global-error">⚠️ {{ globalError }}</div>
              </Transition>

              <div class="step2-actions">
                <button type="button" class="btn-back-step" @click="step = 1">← Atrás</button>
                <button type="submit" class="btn-submit btn-submit--flex" :class="{ loading: isLoading }" :disabled="isLoading">
                  <span v-if="!isLoading">Crear cuenta 🌸</span>
                  <span v-else class="spinner"></span>
                </button>
              </div>

            </div>
          </Transition>

        </form>

        <p class="form-footer">
          Al registrarte aceptas nuestra
          <router-link to="/legal" class="link-pink">política de privacidad</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { registrar } from '../composables/useAuth'

const router      = useRouter()
const step        = ref(1)
const showPass    = ref(false)
const showConfirm = ref(false)
const isLoading   = ref(false)
const globalError = ref('')

const form    = reactive({ nombre: '', email: '', password: '', confirm: '', terms: false })
const errors  = reactive({ nombre: '', email: '', password: '', confirm: '', terms: '' })
const fieldOk = reactive({ nombre: false, email: false, password: false, confirm: false })

const validateNombre = () => {
  errors.nombre = ''; fieldOk.nombre = false
  if (!form.nombre.trim()) { errors.nombre = 'Tu nombre es obligatorio.'; return }
  if (form.nombre.trim().length < 3) { errors.nombre = 'Mínimo 3 caracteres.'; return }
  fieldOk.nombre = true
}
const validateEmail = () => {
  errors.email = ''; fieldOk.email = false
  if (!form.email) { errors.email = 'El correo es obligatorio.'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Correo inválido.'; return }
  fieldOk.email = true
}
const validatePassword = () => {
  errors.password = ''; fieldOk.password = false
  if (!form.password) { errors.password = 'La contraseña es obligatoria.'; return }
  if (form.password.length < 6) { errors.password = 'Mínimo 6 caracteres.'; return }
  fieldOk.password = true
}
const validateConfirm = () => {
  errors.confirm = ''; fieldOk.confirm = false
  if (!form.confirm) { errors.confirm = 'Confirma tu contraseña.'; return }
  if (form.confirm !== form.password) { errors.confirm = 'Las contraseñas no coinciden.'; return }
  fieldOk.confirm = true
}

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return { level: '', pct: 0, label: '' }
  if (p.length < 6)  return { level: 'weak',   pct: 25,  label: '🔴 Débil'   }
  if (p.length < 10) return { level: 'fair',   pct: 55,  label: '🟡 Regular' }
  if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p))
    return { level: 'strong', pct: 100, label: '🟢 Fuerte' }
  return { level: 'good', pct: 80, label: '🔵 Buena' }
})

const goStep2 = () => {
  validateNombre()
  validateEmail()
  if (fieldOk.nombre && fieldOk.email) step.value = 2
}

const handleSubmit = async () => {
  validatePassword()
  validateConfirm()
  if (!form.terms) { errors.terms = 'Debes aceptar los términos para continuar.'; return }
  if (errors.password || errors.confirm) return

  isLoading.value   = true
  globalError.value = ''

  try {
    await registrar(form.nombre.trim(), form.email, form.password)
    router.push('/')
  } catch (e) {
    const mensajes = {
      'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
      'auth/invalid-email':        'El formato del correo no es válido.',
      'auth/weak-password':        'La contraseña es muy débil. Usa al menos 6 caracteres.',
    }
    globalError.value = mensajes[e.code] || 'Ocurrió un error. Intenta de nuevo.'
    step.value = e.code === 'auth/email-already-in-use' ? 1 : 2
  } finally {
    isLoading.value = false
  }
}

const perks = [
  { icon: '🌸', text: 'Aparta productos con tu nombre'       },
  { icon: '📦', text: 'Historial de tus pedidos'             },
  { icon: '💬', text: 'Notificaciones de nuevo stock'        },
  { icon: '💖', text: 'Parte de la comunidad FLWRSTORE'      },
]

const petalStyle = (i) => ({
  '--x':        `${10 + (i * 9) % 85}%`,
  '--delay':    `${i * 0.7}s`,
  '--duration': `${7 + (i % 4)}s`,
  '--size':     `${0.9 + (i % 3) * 0.4}rem`,
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.signup-page {
  min-height: 100vh; display: grid;
  grid-template-columns: 1fr 1fr; padding-top: 70px;
}

/* Deco — mismo que login */
.signup-deco {
  position: relative;
  background: linear-gradient(160deg, #fce4ec 0%, #f8bbd9 50%, #f48fb1 100%);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; min-height: calc(100vh - 70px);
}
.deco__blobs { position: absolute; inset: 0; pointer-events: none; }
.deco-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.5; animation: blobDrift 9s ease-in-out infinite alternate; }
.deco-blob--1 { width: 400px; height: 400px; background: rgba(233,30,140,.3);  top: -80px;   right: -80px; }
.deco-blob--2 { width: 280px; height: 280px; background: rgba(255,255,255,.4); bottom: -40px; left: -40px; animation-delay: 3s; }
@keyframes blobDrift { from { transform: scale(1) translate(0,0); } to { transform: scale(1.1) translate(15px,-20px); } }
.deco__petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.deco-petal { position: absolute; left: var(--x); top: -20px; font-size: var(--size); opacity: 0; animation: petalFall var(--duration) var(--delay) ease-in infinite; }
@keyframes petalFall { 0%{opacity:0;transform:translateY(0) rotate(0deg)} 10%{opacity:.7} 90%{opacity:.3} 100%{opacity:0;transform:translateY(105vh) rotate(360deg)} }
.deco__content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 28px; text-align: center; padding: 40px 32px; }
.deco__logo { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 700; letter-spacing: 6px; color: #fff; display: flex; align-items: center; gap: 6px; text-shadow: 0 4px 20px rgba(194,24,91,.3); }
.deco__logo-icon { display: inline-block; animation: spin 5s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.deco__tagline { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.3rem; color: rgba(255,255,255,.9); line-height: 1.5; }

.deco__perks { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 280px; }
.perk {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,.2); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.35);
  border-radius: 14px; padding: 12px 16px; text-align: left;
  animation: slideInPerk 0.5s ease both;
}
.perk:nth-child(1){animation-delay:.1s} .perk:nth-child(2){animation-delay:.2s} .perk:nth-child(3){animation-delay:.3s} .perk:nth-child(4){animation-delay:.4s}
@keyframes slideInPerk { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
.perk span { font-size: 1.3rem; flex-shrink: 0; }
.perk p { font-size: 0.83rem; color: rgba(255,255,255,.95); font-weight: 500; margin: 0; }

/* Formulario */
.signup-form-side { display: flex; align-items: center; justify-content: center; background: var(--cream); padding: 40px 24px; }
.signup-form-wrap { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 18px; animation: formIn 0.6s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes formIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

.form-back { font-size: 0.82rem; color: var(--text-light); text-decoration: none; transition: color 0.2s; display: inline-block; }
.form-back:hover { color: var(--pink-accent); }
.form-header { display: flex; flex-direction: column; gap: 8px; }
.form-header__tag { display: inline-block; background: rgba(233,30,140,.1); color: var(--pink-deep); font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 50px; width: fit-content; }
.form-header h1 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--text); line-height: 1.1; }
.form-header p { font-size: 0.9rem; color: var(--text-light); }
.link-pink { color: var(--pink-accent); text-decoration: none; font-weight: 600; }
.link-pink:hover { text-decoration: underline; }

/* Steps */
.steps-indicator { display: flex; align-items: center; gap: 0; position: relative; }
.step-dot {
  width: 32px; height: 32px; border-radius: 50%;
  background: #fff; border: 2px solid rgba(233,30,140,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.82rem; font-weight: 700; color: var(--text-light);
  z-index: 1; transition: all 0.35s;
}
.step-dot.active { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(233,30,140,.3); }
.step-dot.done   { background: #22c55e; border-color: transparent; color: #fff; }
.steps-line { flex: 1; height: 2px; background: rgba(233,30,140,.15); margin: 0 8px; transition: background 0.5s; }
.steps-line.filled { background: linear-gradient(90deg, var(--pink-mid), var(--pink-accent)); }
.step-label { font-size: 0.78rem; color: var(--text-light); font-weight: 500; letter-spacing: 0.5px; margin-top: -8px; }

/* Campos — igual que login */
.form { display: flex; flex-direction: column; gap: 14px; }
.step-fields { display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--text-light); }
.field__input-wrap { display: flex; align-items: center; gap: 10px; background: #fff; border: 1.5px solid rgba(233,30,140,.2); border-radius: 14px; padding: 12px 16px; transition: border-color .25s, box-shadow .25s; }
.field__input-wrap:focus-within { border-color: var(--pink-accent); box-shadow: 0 0 0 4px rgba(233,30,140,.08); }
.field--ok .field__input-wrap { border-color: #22c55e; }
.field--error .field__input-wrap { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,.07); }
.field__icon { font-size: 1rem; flex-shrink: 0; }
.field__input-wrap input { flex: 1; border: none; outline: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 0.92rem; color: var(--text); }
.field__input-wrap input::placeholder { color: var(--text-light); }
.field__check { color: #22c55e; font-size: 0.9rem; font-weight: 700; }
.field__eye { background: none; border: none; cursor: pointer; font-size: 0.9rem; padding: 0 2px; }
.field__error { font-size: 0.78rem; color: #ef4444; padding-left: 4px; }

/* Password strength */
.password-strength { height: 3px; background: rgba(233,30,140,.1); border-radius: 10px; overflow: hidden; margin-top: 4px; }
.ps-bar { height: 100%; border-radius: 10px; transition: width 0.4s ease, background 0.4s; }
.ps-bar--weak   { background: #ef4444; }
.ps-bar--fair   { background: #f59e0b; }
.ps-bar--good   { background: #3b82f6; }
.ps-bar--strong { background: #22c55e; }
.ps-label { font-size: 0.72rem; font-weight: 600; }
.ps-label--weak   { color: #ef4444; }
.ps-label--fair   { color: #b45309; }
.ps-label--good   { color: #3b82f6; }
.ps-label--strong { color: #15803d; }

/* Terms */
.terms-row { display: flex; align-items: flex-start; gap: 10px; }
.terms-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--pink-accent); flex-shrink: 0; margin-top: 2px; cursor: pointer; }
.terms-row label { font-size: 0.82rem; color: var(--text-light); cursor: pointer; line-height: 1.5; }
.terms-row--error label { color: #ef4444; }

/* Acciones */
.step2-actions { display: flex; gap: 10px; }
.btn-back-step { background: #fff; border: 1.5px solid rgba(233,30,140,.2); color: var(--text-light); padding: 14px 20px; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
.btn-back-step:hover { border-color: var(--pink-mid); color: var(--text); }
.btn-submit { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); color: #fff; border: none; padding: 15px; border-radius: 14px; width: 100%; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 28px rgba(233,30,140,.3); display: flex; align-items: center; justify-content: center; min-height: 52px; }
.btn-submit--flex { flex: 1; width: auto; }
.btn-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(233,30,140,.4); }
.btn-submit:disabled { opacity: 0.75; cursor: not-allowed; }
.spinner { width: 22px; height: 22px; border: 2.5px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }

.global-error { background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.2); color: #b91c1c; border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; }

.form-footer { text-align: center; font-size: 0.78rem; color: var(--text-light); line-height: 1.6; }

/* Transitions */
.step-enter-active, .step-leave-active { transition: all 0.3s ease; }
.step-enter-from { opacity: 0; transform: translateX(20px); }
.step-leave-to   { opacity: 0; transform: translateX(-20px); }
.err-enter-active, .err-leave-active { transition: all 0.25s ease; }
.err-enter-from, .err-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 768px) {
  .signup-page { grid-template-columns: 1fr; }
  .signup-deco { min-height: 260px; padding: 32px 20px; }
  .deco__perks { display: none; }
  .deco__logo  { font-size: 2rem; }
  .signup-form-side { padding: 28px 20px; }
}
</style>