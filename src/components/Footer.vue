<template>
  <footer class="footer">
    <div class="footer__inner">

      <div class="footer__brand">
        <div class="footer__logo">FLWR 🌸 STORE</div>
        <p>Tu tienda K-Pop de confianza.<br>Hecho con amor desde Aguascalientes 💖</p>
        <div class="footer__socials">
          <a href="https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg==" target="_blank" class="footer__social" aria-label="Instagram">📸</a>
          <a href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t" target="_blank" class="footer__social" aria-label="WhatsApp">💬</a>
        </div>
      </div>

      <div class="footer__links">
        <h4>Navegación</h4>
        <router-link to="/">Inicio</router-link>
        <router-link to="/stock">Stock disponible</router-link>
        <router-link to="/pagos">Formas de pago</router-link>
        <router-link to="/legal">Aviso legal</router-link>
      </div>

      <div class="footer__contact">
        <h4>Contacto & Atención</h4>
        <div class="footer__contact-item">
          <span>👑</span>
          <div>
            <strong>Andrea Esqueda</strong>
            <p>Fundadora & Administradora</p>
          </div>
        </div>
        <div class="footer__contact-item">
          <span>💬</span>
          <div>
            <strong>WhatsApp</strong>
            <a href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t" target="_blank">Canal oficial de ventas</a>
          </div>
        </div>
        <div class="footer__contact-item">
          <span>🕐</span>
          <div>
            <strong>Horario de atención</strong>
            <p>Lun–Sáb 10:00–20:00 · Dom 11:00–15:00</p>
          </div>
        </div>
        <div class="footer__contact-item">
          <span>📍</span>
          <div>
            <strong>Entregas personales</strong>
            <p>Templo de San José, Zona Centro, Ags.</p>
          </div>
        </div>
      </div>

    </div>

    <div class="footer__bottom">
      <p>© {{ currentYear }} FLWR STORE · Andrea Esqueda · Todos los derechos reservados.</p>
      <div class="footer__bottom-right">
        <span class="footer__version">v1.1.0</span>
        <p>Diseño y desarrollo web por <strong>Ing. Juan Martín Esparza de la Cruz</strong></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

.footer {
  background: #1a1a2e;
  padding: 60px 24px 0;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.footer__logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #fff;
  margin-bottom: 12px;
}

.footer__brand p {
  font-size: 0.88rem;
  color: rgba(255,255,255,.6);
  line-height: 1.7;
  margin-bottom: 20px;
}

.footer__socials { display: flex; gap: 10px; }

.footer__social {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s;
}
.footer__social:hover {
  background: rgba(233,30,140,.3);
  border-color: #f48fb1;
  transform: translateY(-3px);
}

.footer__links { display: flex; flex-direction: column; gap: 10px; }
.footer__links h4 {
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: #f48fb1; margin-bottom: 6px;
}
.footer__links a {
  font-size: 0.88rem;
  color: rgba(255,255,255,.6);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__links a:hover { color: #fff; }

.footer__contact { display: flex; flex-direction: column; gap: 14px; }
.footer__contact h4 {
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: #f48fb1; margin-bottom: 2px;
}

.footer__contact-item { display: flex; gap: 12px; align-items: flex-start; }
.footer__contact-item span   { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
.footer__contact-item strong { display: block; font-size: 0.85rem; color: #fff; margin-bottom: 2px; }
.footer__contact-item p      { font-size: 0.78rem; color: rgba(255,255,255,.55); margin: 0; line-height: 1.5; }
.footer__contact-item a      { font-size: 0.78rem; color: #f48fb1; text-decoration: none; }
.footer__contact-item a:hover { color: #fce4ec; }

.footer__bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.footer__bottom p { font-size: 0.75rem; color: rgba(255,255,255,.35); margin: 0; }

.footer__bottom-right {
  display: flex; align-items: center;
  gap: 12px; flex-wrap: wrap; justify-content: flex-end;
}

.footer__version {
  background: rgba(233,30,140,.25);
  border: 1px solid rgba(233,30,140,.4);
  color: #f48fb1;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 1px;
  padding: 3px 10px;
  border-radius: 50px;
}
.footer__bottom strong { color: rgba(255,255,255,.55); }

@media (max-width: 768px) {
  .footer__inner { grid-template-columns: 1fr; gap: 32px; }
  .footer__bottom { flex-direction: column; text-align: center; }
  .footer__bottom-right { justify-content: center; }
}
</style>