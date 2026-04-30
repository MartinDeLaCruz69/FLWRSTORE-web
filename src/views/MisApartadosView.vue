<template>
  <div class="apartados-page">

    <!-- Hero -->
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__content">
        <span class="page-tag">🌸 Mi cuenta</span>
        <h1>Mis <span class="text-pink">Apartados</span></h1>
        <p>Aquí puedes ver tus productos apartados y coordinar el pago 💖</p>
      </div>
    </section>

    <div class="apartados-content">

      <!-- Cargando -->
      <div v-if="cargando" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando tus apartados... 🌸</p>
      </div>

      <!-- Sin apartados -->
      <div v-else-if="misApartados.length === 0" class="empty-state">
        <span>🌸</span>
        <h3>No tienes productos apartados</h3>
        <p>Cuando apartes algo aparecerá aquí con el tiempo restante para pagar.</p>
        <router-link to="/stock" class="btn-primary">Ver Stock disponible →</router-link>
      </div>

      <!-- Lista de apartados -->
      <div v-else class="apartados-grid">
        <div
          v-for="(prod, i) in misApartados"
          :key="prod.id"
          class="apartado-card"
          :style="{ '--i': i }"
        >
          <!-- Imagen -->
          <div class="apartado-card__img">
            <img v-if="prod.imagenUrl" :src="prod.imagenUrl" :alt="prod.nombre" />
            <span v-else class="apartado-card__emoji">{{ catEmoji[prod.categoria] || '🎵' }}</span>
            <span class="apartado-card__cat-badge">{{ prod.categoria }}</span>
          </div>

          <!-- Info -->
          <div class="apartado-card__body">
            <h3>{{ prod.nombre }}</h3>
            <p class="apartado-card__grupo">🎤 {{ prod.grupo }}</p>

            <div class="apartado-card__details">
              <div class="detail-item">
                <span class="detail-label">💰 Precio</span>
                <strong>${{ prod.precio?.toLocaleString() }} MXN</strong>
              </div>
              <div class="detail-item">
                <span class="detail-label">📦 Condición</span>
                <strong>{{ prod.condicion === 'nuevo' ? '✨ Nuevo' : '📦 2da mano' }}</strong>
              </div>
            </div>

            <!-- Inclusiones -->
            <div v-if="prod.inclusiones?.length" class="apartado-card__inclusiones">
              <span class="detail-label">🎁 Inclusiones</span>
              <div class="inclusion-tags">
                <span v-for="inc in prod.inclusiones" :key="inc" class="inclusion-tag">{{ inc }}</span>
              </div>
            </div>

            <!-- Countdown -->
            <div class="apartado-card__timer" :class="timerClass(prod.fechaApartado)">
              <span class="timer-icon">⏱️</span>
              <div>
                <span class="timer-label">Tiempo restante para pagar</span>
                <strong class="timer-value">{{ calcularTiempoRestante(prod.fechaApartado) }}</strong>
              </div>
            </div>

            <!-- Anticipo si aplica -->
            <div v-if="prod.precio >= 550" class="apartado-card__anticipo">
              💰 Anticipo mínimo disponible:
              <strong>${{ Math.ceil(prod.precio * 0.2).toLocaleString() }} MXN (20%)</strong>
            </div>

            <!-- Acción WhatsApp -->
            <a
              :href="generarMensajeWhatsApp(prod)"
              target="_blank"
              class="btn-whatsapp"
            >
              💬 Coordinar pago por WhatsApp
            </a>

            <!-- Nota de políticas -->
            <p class="apartado-card__nota">
              ⚠️ Si no se completa el pago en 24h, el producto regresa al stock automáticamente.
            </p>
          </div>
        </div>
      </div>

      <!-- Info adicional -->
      <div v-if="misApartados.length > 0" class="apartados-info">
        <div class="info-item">
          <span>📋</span>
          <p>Todos los pagos se confirman únicamente por <strong>WhatsApp oficial</strong>.</p>
        </div>
        <div class="info-item">
          <span>🔒</span>
          <p>No se aceptan cancelaciones una vez realizado el pago.</p>
        </div>
        <div class="info-item">
          <span>💳</span>
          <p>Métodos aceptados: Transferencia SPEI y depósito OXXO.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { db } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { usuarioActual } from '../composables/useAuth'

const cargando    = ref(true)
const productos   = ref([])
let unsubscribe   = null

const catEmoji = {
  'Álbumes': '🎵', 'Photocards': '📸',
  'Peluches': '🧸', 'Lightsticks': '✨', 'Revistas': '📖',
}

// ── Escucha productos apartados por este usuario ─────────────
onMounted(() => {
  if (!usuarioActual.value) return

  const nombreUsuario = usuarioActual.value.displayName ||
                        usuarioActual.value.email?.split('@')[0] || ''

  // Busca productos donde apartadoPor contiene el nombre o email del usuario
  const q = query(
    collection(db, 'productos'),
    where('estado', '==', 'apartado'),
    where('apartadoPor', '==', nombreUsuario)
  )

  unsubscribe = onSnapshot(q, (snap) => {
    productos.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    cargando.value  = false
  })
})

onUnmounted(() => unsubscribe?.())

// ── Solo los apartados por este usuario ─────────────────────
const misApartados = computed(() => productos.value)

// ── Calcular tiempo restante (24h desde fechaApartado) ───────
const ahora = ref(Date.now())
let tickTimer
onMounted(() => { tickTimer = setInterval(() => { ahora.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(tickTimer))

const calcularTiempoRestante = (fechaApartado) => {
  if (!fechaApartado) return 'Sin fecha registrada'

  const fechaMs  = fechaApartado?.toDate?.()?.getTime() || fechaApartado
  const limite   = fechaMs + 24 * 60 * 60 * 1000
  const restante = limite - ahora.value

  if (restante <= 0) return '⚠️ Tiempo vencido — contacta a la tienda'

  const horas   = Math.floor(restante / (1000 * 60 * 60))
  const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((restante % (1000 * 60)) / 1000)

  return `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`
}

const timerClass = (fechaApartado) => {
  if (!fechaApartado) return ''
  const fechaMs  = fechaApartado?.toDate?.()?.getTime() || fechaApartado
  const limite   = fechaMs + 24 * 60 * 60 * 1000
  const restante = limite - ahora.value
  const horas    = restante / (1000 * 60 * 60)
  if (restante <= 0)  return 'timer--vencido'
  if (horas <= 2)     return 'timer--urgente'
  if (horas <= 6)     return 'timer--advertencia'
  return 'timer--ok'
}

// ── Generar link de WhatsApp con datos del producto ──────────
const generarMensajeWhatsApp = (prod) => {
  const numero  = '524492832441' // ← número de Andrea sin espacios ni +
  const nombre  = usuarioActual.value?.displayName ||
                  usuarioActual.value?.email?.split('@')[0] || 'Cliente'
  const mensaje = `Hola! Soy ${nombre} y quiero coordinar el pago de mi apartado:\n\n` +
                  `📦 *${prod.nombre}* — ${prod.grupo}\n` +
                  `💰 Precio: $${prod.precio?.toLocaleString()} MXN\n` +
                  `📋 Categoría: ${prod.categoria}\n\n` +
                  `¿Me puedes confirmar los datos para el pago? 🌸`
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.apartados-page { min-height: 100vh; background: var(--cream, #fff8f5); }

/* ── Hero ────────────────────────────────────────────────── */
.page-hero { position: relative; padding: 120px 5vw 70px; text-align: center; overflow: hidden; }
.page-hero__bg {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #fff8f5 0%, #fce4ec 60%, #fff 100%);
  z-index: 0;
}
.page-hero__content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
.page-tag {
  display: inline-block; background: rgba(233,30,140,.1); color: #c2185b;
  font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  padding: 6px 18px; border-radius: 50px; margin-bottom: 18px;
}
.page-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15;
  margin-bottom: 14px; color: #1a1a1a;
}
.text-pink { color: #e91e8c; }
.page-hero p { font-size: 1.05rem; color: #555; }

/* ── Content ─────────────────────────────────────────────── */
.apartados-content { max-width: 900px; margin: 0 auto; padding: 48px 24px 100px; }

/* ── Loading / Empty ─────────────────────────────────────── */
.loading-state, .empty-state {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: #555;
}
.loading-spinner {
  width: 40px; height: 40px; border-radius: 50%;
  border: 3px solid rgba(233,30,140,.15);
  border-top-color: #e91e8c;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty-state span { font-size: 4rem; }
.empty-state h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a1a1a; }
.empty-state p  { font-size: 0.95rem; max-width: 400px; line-height: 1.6; }

.btn-primary {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff; border: none; padding: 14px 32px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600;
  text-decoration: none; display: inline-block; cursor: pointer;
  box-shadow: 0 8px 25px rgba(233,30,140,.3); transition: all 0.3s;
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(233,30,140,.4); }

/* ── Grid de apartados ───────────────────────────────────── */
.apartados-grid { display: flex; flex-direction: column; gap: 24px; }

.apartado-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid rgba(233,30,140,.12);
  box-shadow: 0 4px 24px rgba(233,30,140,.08);
  display: grid;
  grid-template-columns: 220px 1fr;
  animation: cardIn 0.5s ease both;
  animation-delay: calc(var(--i) * 0.1s);
  transition: box-shadow 0.3s;
}
.apartado-card:hover { box-shadow: 0 12px 40px rgba(233,30,140,.15); }
@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: none; }
}

/* Imagen */
.apartado-card__img {
  position: relative;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  display: flex; align-items: center; justify-content: center;
  min-height: 200px; overflow: hidden;
}
.apartado-card__img img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.apartado-card__emoji { font-size: 4rem; }
.apartado-card__cat-badge {
  position: absolute; bottom: 10px; left: 10px;
  background: rgba(233,30,140,.15); color: #c2185b;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 50px;
}

/* Body */
.apartado-card__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.apartado-card__body h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem; color: #1a1a1a; margin: 0;
}
.apartado-card__grupo { font-size: 0.9rem; color: #555; margin: 0; }

/* Details */
.apartado-card__details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.detail-item {
  background: rgba(252,228,236,.35); border-radius: 12px; padding: 12px;
  display: flex; flex-direction: column; gap: 3px;
}
.detail-label { font-size: 0.72rem; color: #888; }
.detail-item strong { font-size: 0.88rem; color: #1a1a1a; }

/* Inclusiones */
.apartado-card__inclusiones { display: flex; flex-direction: column; gap: 6px; }
.inclusion-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.inclusion-tag {
  background: rgba(233,30,140,.08); border: 1px solid rgba(233,30,140,.15);
  color: #c2185b; padding: 3px 10px; border-radius: 50px; font-size: 0.75rem;
}

/* Timer */
.apartado-card__timer {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-radius: 14px;
  border: 1.5px solid transparent;
  transition: all 0.3s;
}
.timer--ok          { background: rgba(34,197,94,.08);  border-color: rgba(34,197,94,.2); }
.timer--advertencia { background: rgba(245,158,11,.08); border-color: rgba(245,158,11,.2); }
.timer--urgente     { background: rgba(239,68,68,.08);  border-color: rgba(239,68,68,.2); animation: pulseTimer 1s ease infinite; }
.timer--vencido     { background: rgba(0,0,0,.05);      border-color: rgba(0,0,0,.1); }
@keyframes pulseTimer { 0%,100%{opacity:1} 50%{opacity:0.6} }

.timer-icon { font-size: 1.4rem; flex-shrink: 0; }
.timer-label { display: block; font-size: 0.72rem; color: #555; margin-bottom: 2px; }
.timer-value { font-size: 1.2rem; font-family: 'Playfair Display', serif; color: #1a1a1a; font-weight: 700; letter-spacing: 1px; }

/* Anticipo */
.apartado-card__anticipo {
  background: linear-gradient(135deg, rgba(233,30,140,.06), rgba(244,143,177,.08));
  border: 1px solid rgba(233,30,140,.15);
  border-radius: 12px; padding: 10px 14px;
  font-size: 0.85rem; color: #555;
}
.apartado-card__anticipo strong { color: #c2185b; }

/* WhatsApp btn */
.btn-whatsapp {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #fff; text-decoration: none;
  padding: 13px 20px; border-radius: 14px;
  font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 600;
  box-shadow: 0 6px 20px rgba(37,211,102,.3);
  transition: all 0.3s;
}
.btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,211,102,.4); }

/* Nota */
.apartado-card__nota {
  font-size: 0.78rem; color: #888;
  background: rgba(0,0,0,.03); border-radius: 10px;
  padding: 10px 12px; margin: 0; line-height: 1.5;
}

/* Info adicional */
.apartados-info {
  margin-top: 32px;
  background: #fff; border-radius: 20px;
  padding: 24px 28px;
  border: 1.5px solid rgba(233,30,140,.1);
  display: flex; flex-direction: column; gap: 12px;
}
.info-item {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 0.88rem; color: #555; line-height: 1.5;
}
.info-item span { font-size: 1.2rem; flex-shrink: 0; }
.info-item strong { color: #1a1a1a; }

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 640px) {
  .apartado-card { grid-template-columns: 1fr; }
  .apartado-card__img { min-height: 160px; }
  .apartado-card__details { grid-template-columns: 1fr; }
}
</style>