<template>
  <div class="maintenance">
    <div class="maintenance__bg">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
    </div>

    <div class="maintenance__content">
      <div class="maintenance__icon">🛠️</div>

      <div class="maintenance__logo">FLWR 🌸 STORE</div>

      <h1>Sitio en mantenimiento</h1>

      <p>
        Estamos realizando mejoras para brindarte una mejor experiencia.
        <br />
        La tienda estará disponible nuevamente en breve.
      </p>

      <div class="maintenance-card">
        <strong>⚠️ Mantenimiento temporal</strong>

        <span>
          Estamos actualizando funcionalidades, corrigiendo errores y mejorando
          el rendimiento de la plataforma.
        </span>
      </div>

      <a
        href="https://www.instagram.com/its.flwr_store"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-ig"
      >
        📸 Síguenos en Instagram
      </a>

      <div class="beta-badge">Gracias por tu paciencia y comprensión 🌸</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
}

.maintenance {
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;

  padding: 2rem;

  background: linear-gradient(135deg, #fff7fa 0%, #fff0f6 50%, #ffe6f0 100%);
}

/* Fondo decorativo */
.maintenance__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
}

.blob--1 {
  width: 450px;
  height: 450px;
  background: rgba(233, 30, 99, 0.18);
  top: -150px;
  right: -100px;
}

.blob--2 {
  width: 350px;
  height: 350px;
  background: rgba(255, 105, 180, 0.15);
  bottom: -120px;
  left: -80px;
}

/* Contenido */
.maintenance__content {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 750px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 1.5rem;
}

/* Icono */
.maintenance__icon {
  width: 120px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 5rem;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.85);

  box-shadow:
    0 15px 40px rgba(233, 30, 140, 0.15),
    0 0 0 10px rgba(255, 255, 255, 0.35);

  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Logo */
.maintenance__logo {
  font-family: "Playfair Display", serif;

  font-size: clamp(1.3rem, 5vw, 2rem);

  font-weight: 700;

  letter-spacing: clamp(2px, 1vw, 6px);

  color: #c2185b;
}

/* Título */
.maintenance h1 {
  margin: 0;

  font-family: "Playfair Display", serif;

  font-size: clamp(2.5rem, 6vw, 4.5rem);

  background: linear-gradient(135deg, #000000, #000000);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Descripción */
.maintenance p {
  margin: 0;

  max-width: 600px;

  color: #7d5a68;

  font-size: 1.1rem;

  line-height: 1.8;
}

/* Tarjeta */
.maintenance-card {
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;

  gap: 0.8rem;

  padding: clamp(1.25rem, 4vw, 2rem);

  border-radius: 24px;

  background: rgba(255, 255, 255, 0.8);

  backdrop-filter: blur(20px);

  border: 1px solid rgba(233, 30, 140, 0.12);

  box-shadow:
    0 20px 50px rgba(233, 30, 140, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.maintenance-card strong {
  color: #d81b60;
  font-size: 1.15rem;
}

.maintenance-card span {
  color: #6f5561;
  line-height: 1.7;
}

/* Botón Instagram */
.btn-ig {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366);

  color: #fff;
  text-decoration: none;

  padding: 14px 28px;

  border-radius: 999px;

  font-weight: 600;

  transition: all 0.3s ease;

  box-shadow: 0 10px 25px rgba(220, 39, 67, 0.25);
}

.btn-ig:hover {
  transform: translateY(-4px);

  box-shadow: 0 15px 35px rgba(220, 39, 67, 0.35);
}

/* Mensaje final */
.beta-badge {
  padding: 12px 24px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.75);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(233, 30, 140, 0.1);

  color: #a13c68;

  font-weight: 600;
}

/* Mobile */
@media (max-width: 480px) {
  .maintenance {
    padding: 1.5rem;
  }

  .maintenance__content {
    gap: 1.25rem;
  }

  .maintenance__icon {
    width: 90px;
    height: 90px;
    font-size: 3.5rem;
  }

  .maintenance h1 {
    font-size: 2.2rem;
  }

  .maintenance p {
    font-size: 1rem;
  }

  .btn-ig {
    width: 100%;
    max-width: 320px;
    text-align: center;
  }

  .beta-badge {
    width: 100%;
    border-radius: 18px;
  }
}
</style>
