<template>
  <div class="pagos-page">

    <!-- Hero -->
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__content">
        <span class="page-tag">💳 Pagos</span>
        <h1>Formas de pago &<br><span class="text-pink">Flujo de compra</span></h1>
        <p>Así de sencillo es comprar en FLWR STORE 🌸</p>
      </div>
    </section>

    <div class="pagos-content">

      <!-- Métodos de pago -->
      <div class="section-label fade-up" :class="{ visible: v1 }">💳 Métodos aceptados</div>
      <div class="payment__grid fade-up delay-1" :class="{ visible: v1 }" ref="r1">
        <div class="payment__card payment__card--spei">
          <div class="payment__icon">🏦</div>
          <h3>Transferencia SPEI</h3>
          <p>Transferencia bancaria directa desde cualquier banco mexicano. Rápida y segura.</p>
          <span class="payment__badge">Recomendado</span>
        </div>
        <div class="payment__card payment__card--oxxo">
          <div class="payment__icon">🏪</div>
          <h3>Depósito OXXO</h3>
          <p>Paga en efectivo en cualquier tienda OXXO de México. Ideal si no tienes cuenta bancaria.</p>
          <span class="payment__badge payment__badge--oxxo">Efectivo</span>
        </div>
      </div>

      <!-- Nota de datos bancarios -->
      <div class="info-note fade-up delay-2" :class="{ visible: v1 }">
        <span>ℹ️</span>
        <p>Los datos de cuenta para SPEI y OXXO se envían directamente al confirmar tu pedido por <strong>WhatsApp</strong>. Así garantizamos la seguridad de tu información.</p>
      </div>

      <!-- Flujo de compra paso a paso -->
      <div class="section-label fade-up" :class="{ visible: v2 }" ref="r2">🛍️ ¿Cómo comprar?</div>
      <div class="steps__list">
        <div v-for="(step, i) in steps" :key="i"
          class="step__card fade-up" :class="{ visible: v2 }"
          :style="{ transitionDelay: (i * 0.12) + 's' }">
          <div class="step__number">{{ i + 1 }}</div>
          <div class="step__icon">{{ step.icon }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>

      <!-- Reglas de apartado -->
      <div class="section-label fade-up" :class="{ visible: v3 }" ref="r3">📌 Reglas de apartado</div>
      <div class="rules__grid fade-up delay-1" :class="{ visible: v3 }">
        <div class="rule__card">
          <span class="rule__icon">⏱️</span>
          <div>
            <strong>24 horas máximo</strong>
            <p>Tienes 24 horas para completar el pago desde que apartas. Después, el producto regresa a stock.</p>
          </div>
        </div>
        <div class="rule__card rule__card--highlight">
          <span class="rule__icon">💰</span>
          <div>
            <strong>Facilidades en compras +$550 MXN</strong>
            <p>Para pedidos mayores a $550 MXN puedes dar un anticipo del 20% y acordar el resto con la administradora.</p>
          </div>
        </div>
        <div class="rule__card">
          <span class="rule__icon">🚫</span>
          <div>
            <strong>Sin reembolsos ni cancelaciones</strong>
            <p>Una vez realizado el pago no se aceptan cancelaciones ni se realizan devoluciones de dinero.</p>
          </div>
        </div>
        <div class="rule__card">
          <span class="rule__icon">✅</span>
          <div>
            <strong>Confirmación oficial</strong>
            <p>Tu compra queda confirmada únicamente a través del canal oficial de WhatsApp.</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="pagos__cta fade-up" :class="{ visible: v3 }">
        <p>¿Lista para apartar algo del stock?</p>
        <div class="pagos__cta-btns">
          <router-link to="/stock" class="btn-primary">🛍️ Ver Stock disponible</router-link>
          <a href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t" target="_blank" class="btn-ghost">💬 Ir al canal de WhatsApp</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const steps = [
  { icon: '📱', title: 'Únete al canal', desc: 'Entra al canal de WhatsApp oficial para ver el stock disponible en tiempo real.' },
  { icon: '🌸', title: 'Elige tu producto', desc: 'Escoge el álbum, photocard, peluche o artículo que quieras y dile a la administradora.' },
  { icon: '📌', title: 'Aparta en el sitio', desc: 'El producto queda apartado a tu nombre. Tienes 24 horas para completar el pago.' },
  { icon: '💳', title: 'Realiza tu pago', desc: 'Transfiere por SPEI o deposita en OXXO con los datos que te enviaremos por WhatsApp.' },
  { icon: '📸', title: 'Envía tu comprobante', desc: 'Manda el comprobante de pago al canal. Confirmamos tu pedido en menos de una hora (en horario de atención).' },
  { icon: '📦', title: '¡Listo! Tu pedido en camino', desc: 'Coordinamos la entrega o envío según tu ubicación. ¡Tu merch K-pop ya es tuyo! 🌸' },
]

// Animaciones
const v1 = ref(false), r1 = ref(null)
const v2 = ref(false), r2 = ref(null)
const v3 = ref(false), r3 = ref(null)

let obs
onMounted(() => {
  obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.target === r1.value && e.isIntersecting) v1.value = true
      if (e.target === r2.value && e.isIntersecting) v2.value = true
      if (e.target === r3.value && e.isIntersecting) v3.value = true
    })
  }, { threshold: 0.1 })
  setTimeout(() => {
    v1.value = true
    ;[r1, r2, r3].forEach(r => { if (r.value) obs.observe(r.value) })
  }, 200)
})
onUnmounted(() => obs?.disconnect())
</script>

<style scoped>
.pagos-page { min-height: 100vh; }

/* Reutiliza estilos del page-hero — igual que LegalView */
.page-hero {
  position: relative; padding: 120px 5vw 80px; text-align: center; overflow: hidden;
}
.page-hero__bg {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #fff8f5 0%, #fce4ec 60%, #fff 100%);
  z-index: 0;
}
.page-hero__content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
.page-tag {
  display: inline-block; background: rgba(233,30,140,.1); color: var(--pink-deep);
  font-size: 0.8rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  padding: 6px 18px; border-radius: 50px; margin-bottom: 20px;
}
.page-hero h1 { font-size: clamp(2rem,5vw,3.5rem); line-height: 1.15; margin-bottom: 16px; color: var(--text); font-family: 'Playfair Display', serif; }
.text-pink { color: var(--pink-accent); }
.page-hero p { font-size: 1.05rem; color: var(--text-light); }

.pagos-content { max-width: 960px; margin: 0 auto; padding: 60px 24px 100px; display: flex; flex-direction: column; gap: 24px; }

.section-label {
  font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--pink-accent); margin-top: 20px;
}

/* Animaciones */
.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-up.visible { opacity: 1; transform: none; }
.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.3s; }

/* Métodos de pago */
.payment__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.payment__card {
  background: #fff; border-radius: 24px; padding: 32px 28px;
  border: 2px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 24px rgba(233,30,140,.07);
  position: relative; overflow: hidden;
  transition: transform 0.3s;
}
.payment__card:hover { transform: translateY(-6px); }
.payment__card--spei { border-color: rgba(233,30,140,.25); }
.payment__card--oxxo { border-color: rgba(255,100,0,.2); }
.payment__icon { font-size: 2.5rem; margin-bottom: 14px; }
.payment__card h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--text); margin-bottom: 10px; }
.payment__card p { font-size: 0.9rem; color: var(--text-light); line-height: 1.6; }
.payment__badge {
  position: absolute; top: 20px; right: 20px;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; font-size: 0.72rem; font-weight: 600;
  padding: 4px 12px; border-radius: 50px;
}
.payment__badge--oxxo { background: linear-gradient(135deg, #ff6400, #ff9000); }

/* Nota info */
.info-note {
  display: flex; align-items: flex-start; gap: 14px;
  background: rgba(233,30,140,.05); border: 1px solid rgba(233,30,140,.15);
  border-radius: 16px; padding: 18px 22px;
  font-size: 0.9rem; color: var(--text-light); line-height: 1.6;
}
.info-note span { font-size: 1.3rem; flex-shrink: 0; }
.info-note strong { color: var(--text); }

/* Pasos */
.steps__list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
.step__card {
  background: #fff; border-radius: 20px; padding: 28px 24px;
  border: 1.5px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
  display: flex; flex-direction: column; gap: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}
.step__card:hover { transform: translateY(-6px); box-shadow: 0 14px 40px rgba(233,30,140,.14); }
.step__number {
  position: absolute; top: -12px; left: 24px;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700;
}
.step__icon { font-size: 2rem; margin-top: 8px; }
.step__card h3 { font-size: 0.95rem; color: var(--text); font-weight: 600; }
.step__card p  { font-size: 0.85rem; color: var(--text-light); line-height: 1.6; }

/* Reglas */
.rules__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.rule__card {
  display: flex; gap: 16px; align-items: flex-start;
  background: #fff; border-radius: 18px; padding: 22px 20px;
  border: 1.5px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 16px rgba(233,30,140,.05);
  transition: transform 0.3s;
}
.rule__card:hover { transform: translateY(-4px); }
.rule__card--highlight {
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border-color: var(--pink-mid);
}
.rule__icon { font-size: 1.8rem; flex-shrink: 0; }
.rule__card strong { display: block; font-size: 0.9rem; color: var(--text); margin-bottom: 6px; }
.rule__card p { font-size: 0.83rem; color: var(--text-light); line-height: 1.6; margin: 0; }

/* CTA */
.pagos__cta {
  text-align: center; padding: 40px 24px;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border-radius: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.pagos__cta p { color: rgba(255,255,255,.9); font-size: 1.1rem; font-family: 'Playfair Display', serif; }
.pagos__cta-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.btn-primary {
  background: #fff; color: var(--pink-accent); border: none;
  padding: 12px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
  text-decoration: none; cursor: pointer;
  box-shadow: 0 6px 20px rgba(0,0,0,.15);
  transition: all 0.3s;
}
.btn-primary:hover { transform: translateY(-2px); }
.btn-ghost {
  background: rgba(255,255,255,.15); color: #fff;
  border: 1.5px solid rgba(255,255,255,.5);
  padding: 12px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
  text-decoration: none; cursor: pointer; transition: all 0.2s;
}
.btn-ghost:hover { background: rgba(255,255,255,.25); }

@media (max-width: 640px) {
  .payment__grid, .rules__grid { grid-template-columns: 1fr; }
  .steps__list { grid-template-columns: 1fr; }
}
</style>