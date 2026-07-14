<template>
  <div class="legal-page">
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__content">
        <span class="page-tag">📋 Transparencia</span>
        <h1>
          Aviso Legal &<br /><span class="text-pink"
            >Políticas de la Tienda</span
          >
        </h1>
        <p>
          Todo lo que necesitas saber para comprar con confianza en FLWRSTORE 🌸
        </p>
      </div>
    </section>

    <div class="legal-content">
      <!-- Identidad -->
      <div class="legal-block fade-up" :class="{ visible: vis[0] }" ref="el0">
        <div class="legal-block__header">
          <span class="legal-block__icon">🏪</span>
          <h2>Identidad y contacto</h2>
        </div>
        <div class="legal-block__body">
          <div class="info-row">
            <span class="info-row__label">Nombre comercial</span>
            <span class="info-row__val">FLWRSTORE</span>
          </div>
          <div class="info-row">
            <span class="info-row__label">Titular</span>
            <span class="info-row__val">Andrea Esqueda Rosario</span>
          </div>
          <div class="info-row">
            <span class="info-row__label">Ubicación</span>
            <span class="info-row__val"
              >Aguascalientes, Aguascalientes, México</span
            >
          </div>
          <div class="info-row">
            <span class="info-row__label">Canal de ventas</span>
            <div class="info-row__val">
              <a
                href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t"
                target="_blank"
                class="link-pill"
                >💬 Canal oficial de WhatsApp</a
              >
            </div>
          </div>
          <div class="info-row">
            <span class="info-row__label">Instagram</span>
            <div class="info-row__val">
              <a
                href="https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg=="
                target="_blank"
                class="link-pill link-pill--ig"
                >📸 @its.flwr_store</a
              >
            </div>
          </div>
          <div class="info-row">
            <span class="info-row__label">Horario de atención</span>
            <div class="info-row__val">
              Lun–Sáb 10:00–20:00 · Dom 11:00–15:00<br />
              <small
                >Mensajes fuera de horario se responden al día hábil
                siguiente.</small
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Productos -->
      <div class="legal-block fade-up" :class="{ visible: vis[1] }" ref="el1">
        <div class="legal-block__header">
          <span class="legal-block__icon">🎵</span>
          <h2>Sobre los productos</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>✅</span>
            <p>
              Todos los productos ofrecidos son <strong>originales</strong>. No
              vendemos réplicas ni productos no oficiales, a menos que se
              especifique.
            </p>
          </div>
          <div class="policy-item">
            <span>📸</span>
            <p>
              Las fotografías de los productos son reales y tomadas por el
              equipo de FLWRSTORE. El color y detalles pueden variar ligeramente
              por condiciones de iluminación.
            </p>
          </div>
          <div class="policy-item">
            <span>📦</span>
            <p>
              Los productos de <strong>segunda mano</strong> se describen con su
              condición real. Se indica claramente si tienen detalles, uso o
              faltantes.
            </p>
          </div>
          <div class="policy-item">
            <span>🔄</span>
            <p>
              El stock se actualiza en tiempo real. Un producto visible en la
              tienda puede agotarse o apartarse mientras navegas.
            </p>
          </div>
          <div class="policy-item">
            <span>⚠️</span>
            <p>
              FLWRSTORE no es distribuidora oficial de ningún sello
              discográfico. Somos una tienda de reventa especializada en K-Pop.
            </p>
          </div>
        </div>
      </div>

      <!-- Apartados -->
      <div class="legal-block fade-up" :class="{ visible: vis[2] }" ref="el2">
        <div class="legal-block__header">
          <span class="legal-block__icon">📌</span>
          <h2>Reglas de apartado</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>⏱️</span>
            <p>
              Los apartados tienen una duración máxima de
              <strong>24 horas</strong> a partir de la confirmación, a menos que
              se llegue a otro acuerdo con la administradora.
            </p>
          </div>
          <div class="policy-item">
            <span>💳</span>
            <p>
              Pasadas las 24 horas sin pago confirmado, el producto regresa
              automáticamente al stock disponible sin previo aviso.
            </p>
          </div>
          <div class="policy-item">
            <span>💰</span>
            <p>
              Para compras mayores a <strong>$550 MXN</strong> se puede acordar
              un anticipo del 20% para facilidades de pago, sujeto a
              disponibilidad y acuerdo con la administradora.
            </p>
          </div>
          <div class="policy-item">
            <span>✅</span>
            <p>
              El apartado en la plataforma reserva el producto a tu nombre
              durante 24 horas. La venta queda
              <strong>oficialmente confirmada</strong>
              únicamente cuando se valida el pago a través del canal de WhatsApp
              y la administradora lo registra en el sistema.
            </p>
          </div>
          <div class="policy-item">
            <span>👤</span>
            <p>
              No existe un limite de apartados por cliente, pero cada apartado
              debe ser
              <strong>confirmado</strong>.
            </p>
          </div>
        </div>
      </div>

      <!-- Pagos -->
      <div class="legal-block fade-up" :class="{ visible: vis[3] }" ref="el3">
        <div class="legal-block__header">
          <span class="legal-block__icon">💳</span>
          <h2>Métodos de pago</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>🏦</span>
            <p>
              <strong>Transferencia SPEI</strong> — desde cualquier banco
              mexicano. Los datos se proporcionan al confirmar el pedido por
              WhatsApp.
            </p>
          </div>
          <div class="policy-item">
            <span>🏪</span>
            <p>
              <strong>Depósito OXXO</strong> — en cualquier tienda OXXO del
              país. Los datos de depósito se envían por WhatsApp oficial.
            </p>
          </div>
          <div class="policy-item">
            <span>⚠️</span>
            <p>
              No aceptamos pagos por transferencias a cuentas personales no
              verificadas, ni plataformas de terceros no acordadas previamente.
            </p>
          </div>
          <div class="policy-item">
            <span>📸</span>
            <p>
              El cliente debe enviar <strong>comprobante de pago</strong> a las
              administradoras para confirmar su pedido. Sin comprobante no se
              considera pagado.
            </p>
          </div>
          <div class="policy-item">
            <span>🕐</span>
            <p>
              La confirmación de pago se realiza en un máximo de
              <strong>2 horas hábiles</strong> tras recibir el comprobante.
            </p>
          </div>
        </div>
      </div>

      <!-- Cancelaciones -->
      <div class="legal-block fade-up" :class="{ visible: vis[4] }" ref="el4">
        <div class="legal-block__header">
          <span class="legal-block__icon">🚫</span>
          <h2>Cancelaciones y reembolsos</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>❌</span>
            <p>
              <strong>No se realizan reembolsos</strong> en ningún tipo de
              pedido una vez efectuado el pago.
            </p>
          </div>
          <div class="policy-item">
            <span>❌</span>
            <p>
              No se permiten cancelaciones una vez realizado y confirmado el
              pago.
            </p>
          </div>
          <div class="policy-item">
            <span>⚠️</span>
            <p>
              En pedidos tipo <em>claims</em> o preventas: si no se cubren los
              costos adicionales (EMS, aduana, etc.) en el tiempo acordado, el
              producto pasa a stock disponible sin derecho a devolución del
              anticipo.
            </p>
          </div>
          <div class="policy-item">
            <span>⚠️</span>
            <p>
              En preventas o claims no hay cambios de versión o producto después
              de confirmar el pedido.
            </p>
          </div>
          <div class="policy-item">
            <span>✅</span>
            <p>
              <strong>Excepción:</strong> Si el producto presentara un defecto
              no descrito al momento de la venta y comprobable con evidencia
              fotográfica, se evaluará caso por caso.
            </p>
          </div>
          <div class="policy__highlight">
            ⭐ Al realizar una compra, el cliente acepta todos los términos y
            condiciones de FLWRSTORE en su versión vigente.
          </div>
        </div>
      </div>

      <!-- Envíos -->
      <div class="legal-block fade-up" :class="{ visible: vis[5] }" ref="el5">
        <div class="legal-block__header">
          <span class="legal-block__icon">📦</span>
          <h2>Envíos y entregas</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>📍</span>
            <p>
              <strong>Entrega personal</strong> — Frente al Templo de San José,
              Lic. Francisco Primo Verdad 205, Zona Centro, Aguascalientes. Se
              coordina día y hora por WhatsApp.
            </p>
          </div>
          <div class="policy-item">
            <span>🛵</span>
            <p>
              <strong>Envío local</strong> — por Uber Flash o DiDi dentro de
              Aguascalientes. El costo de envío corre por cuenta del cliente.
            </p>
          </div>
          <div class="policy-item">
            <span>📮</span>
            <p>
              <strong>Envío nacional</strong> — por Correos de México o Estafeta
              vía Lolapay. El costo se calcula según el destino y peso.
            </p>
          </div>
          <div class="policy-item">
            <span>📋</span>
            <p>
              El cliente es responsable de proporcionar correctamente su
              dirección de entrega. FLWRSTORE no se hace responsable por
              retrasos o pérdidas derivadas de datos incorrectos.
            </p>
          </div>
          <div class="policy-item">
            <span>📸</span>
            <p>
              Si el producto llega dañado por causas de la paquetería, el
              cliente debe notificarlo dentro de las
              <strong>24 horas</strong> siguientes a la recepción con evidencia
              fotográfica.
            </p>
          </div>
          <div class="policy-item">
            <span>⏱️</span>
            <p>
              Los tiempos estimados de envío son: Nacional 3–14 días hábiles
              según paquetería.
            </p>
          </div>
        </div>
      </div>

      <!-- Privacidad de datos -->
      <div class="legal-block fade-up" :class="{ visible: vis[6] }" ref="el6">
        <div class="legal-block__header">
          <span class="legal-block__icon">🔒</span>
          <h2>Privacidad y protección de datos</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>📋</span>
            <p>
              FLWRSTORE recopila datos personales básicos (nombre, correo
              electrónico) con el único fin de gestionar tu cuenta y coordinar
              pedidos.
            </p>
          </div>
          <div class="policy-item">
            <span>🔒</span>
            <p>
              Tu información personal
              <strong>no se comparte, vende ni transfiere</strong> a terceros
              bajo ninguna circunstancia.
            </p>
          </div>
          <div class="policy-item">
            <span>🗄️</span>
            <p>
              Los datos se almacenan de forma segura mediante
              <strong>Firebase (Google Cloud)</strong>, con cifrado en tránsito
              y en reposo.
            </p>
          </div>
          <div class="policy-item">
            <span>✉️</span>
            <p>
              Tu correo electrónico solo se usa para autenticación en la
              plataforma. No enviamos correos de marketing sin tu
              consentimiento.
            </p>
          </div>
          <div class="policy-item">
            <span>🗑️</span>
            <p>
              Puedes solicitar la eliminación de tu cuenta y datos personales en
              cualquier momento contactándonos por WhatsApp oficial.
            </p>
          </div>
          <div class="policy-item">
            <span>🍪</span>
            <p>
              Esta plataforma no utiliza cookies de rastreo ni publicidad de
              terceros. Solo se usan cookies técnicas necesarias para el
              funcionamiento de la sesión.
            </p>
          </div>
          <div class="policy-item">
            <span>🧾</span>
            <p>
              El historial de compras registrado en la plataforma es de uso
              exclusivo del cliente titular de la cuenta y del equipo de
              FLWRSTORE. No es visible para otros usuarios.
            </p>
          </div>
          <div class="policy__highlight">
            🚩 Este aviso de privacidad se rige conforme a la
            <strong
              >Ley Federal de Protección de Datos Personales en Posesión de los
              Particulares (LFPDPPP)</strong
            >
            vigente en México.
          </div>
        </div>
      </div>

      <!-- Comunicación oficial -->
      <div class="legal-block fade-up" :class="{ visible: vis[7] }" ref="el7">
        <div class="legal-block__header">
          <span class="legal-block__icon">💬</span>
          <h2>Comunicación oficial</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>✅</span>
            <p>
              Todos los pedidos, confirmaciones y acuerdos se realizan
              <strong>únicamente</strong> a través del canal oficial de WhatsApp
              de FLWRSTORE.
            </p>
          </div>
          <div class="policy-item">
            <span>❌</span>
            <p>
              No nos hacemos responsables por acuerdos, pagos o compromisos
              realizados fuera de los canales oficiales.
            </p>
          </div>
          <div class="policy-item">
            <span>⚠️</span>
            <p>
              FLWRSTORE <strong>nunca</strong> solicitará contraseñas, datos
              bancarios completos ni información sensible por ningún medio.
            </p>
          </div>
          <div class="policy-item">
            <span>📱</span>
            <p>
              Las cuentas oficiales son: WhatsApp canal
              <strong>FLWRSTORE</strong> e Instagram
              <strong>@its.flwr_store</strong>. Cualquier otra cuenta es ajena a
              nosotros.
            </p>
          </div>
          <div
            style="
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              justify-content: center;
              margin-top: 10px;
            "
          >
            <a
              href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t"
              target="_blank"
              class="btn-primary"
              >💬 Canal de WhatsApp</a
            >
            <a
              href="https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg=="
              target="_blank"
              class="btn-secondary"
              >📸 Instagram</a
            >
          </div>
        </div>
      </div>

      <!-- Modificaciones -->
      <div class="legal-block fade-up" :class="{ visible: vis[8] }" ref="el8">
        <div class="legal-block__header">
          <span class="legal-block__icon">📝</span>
          <h2>Modificaciones a estos términos</h2>
        </div>
        <div class="legal-block__body">
          <div class="policy-item">
            <span>🔄</span>
            <p>
              FLWRSTORE se reserva el derecho de actualizar estos términos y
              condiciones en cualquier momento sin previo aviso.
            </p>
          </div>
          <div class="policy-item">
            <span>📅</span>
            <p>
              La versión vigente siempre estará disponible en esta página.
              <br />
              La fecha de última actualización es: <strong>Junio 2026</strong>.
            </p>
          </div>
          <div class="policy-item">
            <span>✅</span>
            <p>
              El uso continuo de la plataforma después de cualquier cambio
              implica la aceptación de los nuevos términos.
            </p>
          </div>
        </div>
      </div>

      <div class="legal-block fade-up" :class="{ visible: vis[9] }" ref="el9">
        <div class="legal-block__header">
          <span class="legal-block__icon">🔜</span>
          <h2>Próxima Versión: v1.1.2</h2>
        </div>
      </div>

      <div
        class="legal__footer fade-up"
        :class="{ visible: vis[10] }"
        ref="el10"
      >
        <span>🌸</span>
        <p>
          Agradecemos profundamente tu confianza y por ser parte de esta
          comunidad. Cada compra la hacemos con amor y compromiso.
        </p>
        <strong>— FLWRSTORE </strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const vis = ref(Array(10).fill(false));
const el0 = ref(null),
  el1 = ref(null),
  el2 = ref(null);
const el3 = ref(null),
  el4 = ref(null),
  el5 = ref(null);
const el6 = ref(null),
  el7 = ref(null),
  el8 = ref(null);
const el9 = ref(null),
  el10 = ref(null);

let observer;
onMounted(() => {
  const els = [el0, el1, el2, el3, el4, el5, el6, el7, el8, el9, el10];

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const idx = els.findIndex((r) => r.value === e.target);
        if (idx >= 0 && e.isIntersecting) vis.value[idx] = true;
      });
    },
    { threshold: 0.1 },
  );

  setTimeout(() => {
    els.forEach((r) => {
      if (r.value) observer.observe(r.value);
    });
    vis.value[0] = true;
  }, 200);
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap");

.legal-page {
  min-height: 100vh;
  background: var(--cream);
}

/* ── Hero ── */
.page-hero {
  position: relative;
  padding: 120px 5vw 80px;
  text-align: center;
  overflow: hidden;
}
.page-hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #fff8f5 0%, #fce4ec 60%, #fff 100%);
  z-index: 0;
}
.page-hero__content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}
.page-tag {
  display: inline-block;
  background: rgba(233, 30, 140, 0.1);
  color: var(--pink-deep);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 50px;
  margin-bottom: 20px;
}
.page-hero h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  margin-bottom: 16px;
  color: var(--text);
}
.text-pink {
  color: var(--pink-accent);
}
.page-hero p {
  font-size: 1.05rem;
  color: var(--text-light);
}

/* ── Content wrapper ── */
.legal-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 60px 24px 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Animaciones ── */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: none;
}

/* ── Bloque legal ── */
.legal-block {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(233, 30, 140, 0.07);
  border: 1.5px solid rgba(233, 30, 140, 0.1);
}
.legal-block__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 28px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border-bottom: 1px solid rgba(233, 30, 140, 0.1);
}
.legal-block__icon {
  font-size: 1.8rem;
}
.legal-block__header h2 {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  color: var(--text);
}
.legal-block__body {
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Info row ── */
.info-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(233, 30, 140, 0.07);
}
.info-row:last-child {
  border-bottom: none;
}
.info-row__label {
  flex-shrink: 0;
  min-width: 160px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-top: 2px;
}
.info-row__val {
  font-size: 0.92rem;
  color: var(--text);
  line-height: 1.6;
}
.info-row__val small {
  color: var(--text-light);
  font-size: 0.8rem;
  display: block;
  margin-top: 4px;
}

/* ── Links ── */
.link-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #33f072, #3ce64a, #2ddc27, #23cc64);
  color: #ffffff;
  padding: 7px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}
.link-pill:hover {
  opacity: 0.85;
}
.link-pill--ig {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366);
}

/* ── Policy item ── */
.policy-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(252, 228, 236, 0.3);
  border: 1px solid rgba(233, 30, 140, 0.08);
}
.policy-item span {
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 1px;
}
.policy-item p {
  font-size: 0.88rem;
  color: var(--text);
  line-height: 1.65;
  margin: 0;
}

/* ── Highlight ── */
.policy__highlight {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #ffffff;
  padding: 16px 20px;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  margin-top: 4px;
}

/* ── Botón ── */
.btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, #33f072, #3ce64a, #2ddc27, #23cc64);
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(233, 30, 140, 0.3);
  transition: all 0.3s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 10px rgba(233, 30, 140, 0.4);
}

.btn-secondary {
  display: inline-block;
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(220, 39, 67, 0.3);
  transition: all 0.3s;
}
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 10px rgba(233, 30, 140, 0.4);
}

.legal__footer {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 24px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border-radius: 24px;
  border: 1.5px solid rgba(233, 30, 140, 0.15);
}
.legal__footer span {
  font-size: 3rem;
}
.legal__footer p {
  color: var(--text-light);
  font-size: 0.95rem;
  max-width: 500px;
  line-height: 1.7;
}
.legal__footer strong {
  color: var(--pink-deep);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  /* Hero */
  .page-hero {
    padding: 80px 16px 48px;
  }
  .page-hero h1 {
    font-size: clamp(1.7rem, 6vw, 2.4rem);
  }
  .page-hero p {
    font-size: 0.9rem;
  }

  /* Content */
  .legal-content {
    padding: 28px 12px 80px;
    gap: 16px;
  }

  /* Bloques */
  .legal-block {
    border-radius: 18px;
  }
  .legal-block__header {
    padding: 16px 18px;
    gap: 10px;
  }
  .legal-block__icon {
    font-size: 1.4rem;
  }
  .legal-block__header h2 {
    font-size: 1.05rem;
  }
  .legal-block__body {
    padding: 16px 18px;
    gap: 8px;
  }

  /* Info rows */
  .info-row {
    flex-direction: column;
    gap: 4px;
    padding: 10px 0;
  }
  .info-row__label {
    min-width: unset;
    font-size: 0.75rem;
  }
  .info-row__val {
    font-size: 0.88rem;
  }

  /* Policy items */
  .policy-item {
    padding: 10px 12px;
    gap: 10px;
    border-radius: 10px;
  }
  .policy-item p {
    font-size: 0.83rem;
  }
  .policy-item span {
    font-size: 1rem;
  }
  .policy__highlight {
    padding: 12px 14px;
    font-size: 0.83rem;
    border-radius: 12px;
  }

  /* Links */
  .link-pill {
    font-size: 0.8rem;
    padding: 6px 14px;
  }

  /* Footer */
  .legal__footer {
    padding: 28px 16px;
    border-radius: 18px;
  }
  .legal__footer span {
    font-size: 2.2rem;
  }
  .legal__footer p {
    font-size: 0.88rem;
  }

  /* Botón */
  .btn-primary {
    padding: 11px 22px;
    font-size: 0.85rem;
  }
}

@media (max-width: 380px) {
  .legal-block__body {
    padding: 12px 14px;
  }
  .legal-block__header {
    padding: 14px;
  }
}
</style>
