<template>
  <div class="home">

    <!-- ============ HERO ============ -->
    <section class="hero" ref="heroRef">
      <div class="hero__bg-blobs">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
        <div class="blob blob--3"></div>
      </div>
      <div class="hero__petals">
        <span v-for="i in 100" :key="i" class="floating-petal" :style="petalStyle(i)">🌸</span>
      </div>
      <div class="hero__content fade-up" :class="{ visible: heroVisible }">
        <h1 class="hero__title">
          Bienvenida(o) a<br>
          <span class="hero__brand">FLWR<span class="hero__brand-icon">🌸</span>STORE</span>
        </h1>
        <p class="hero__sub">Albums, photocards, peluches y mucho más.<br>Todo con amor, desde Aguascalientes para ti.</p>
        <div class="hero__ctas">
          <router-link to="/stock" class="btn-primary btn-lg">Ver Stock disponible</router-link>
          <a href="#quienes-somos" class="btn-ghost btn-lg">¡CONOCENOS! ↓</a>
        </div>
        <div class="hero__stats">
          <div class="stat"><strong>+500</strong><span>Pedidos entregados</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><strong>99%</strong><span>Clientes felices y satisfechos</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><strong>+2 años</strong><span>Siendo especialistas en el mercado</span></div>
        </div>
      </div>
      <div class="hero__visual fade-right" :class="{ visible: heroVisible }">
        <div class="hero__card-stack">
          <div class="card-float card-float--front">
            <div class="card-img-placeholder">🎵</div>
            <span>Albums</span>
          </div>
          <div class="card-float card-float--mid">
            <div class="card-img-placeholder">📸</div>
            <span>Photocards</span>
          </div>
          <div class="card-float card-float--back">
            <div class="card-img-placeholder">🧸</div>
            <span>Peluches</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ QUIÉNES SOMOS ============ -->
    <section id="quienes-somos" class="section section--cream" ref="quienesRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: quienesVisible }">💗 Nuestra historia</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: quienesVisible }">¿Quiénes somos?</h2>
        <div class="about__grid">
          <div class="about__text fade-left" :class="{ visible: quienesVisible }">
            <p>Somos <strong>FLWRSTORE</strong>, una tienda de K-Pop nacida del amor por la música y la cultura coreana. Comenzamos compartiendo álbumes y photocards entre amigos, y poco a poco crecimos hasta convertirnos en un espacio de confianza para fans de toda la república.</p>
            <p>Cada producto que ofrecemos ha sido cuidadosamente seleccionado por tí. Nos aseguramos de entregarte tu pedido en buenas condiciones, con el mismo amor con el que fue elegido.</p>
            <p>Más que una tienda, somos una comunidad 🌸</p>
            <div class="about__values">
              <div class="value-pill">🎁 Empaque seguro</div>
              <div class="value-pill">💌 Atención personalizada</div>
              <div class="value-pill">⚡ Entregas personales y en linea</div>
              <div class="value-pill">🌟 Productos originales</div>
            </div>
          </div>
          <div class="about__image fade-right" :class="{ visible: quienesVisible }">
            <div class="about__img-frame">
              <div class="about__img-placeholder">
                <span class="big-emoji">🌸</span>
                <p>Foto del equipo</p>
              </div>
              <div class="about__img-deco"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ EQUIPO / ORGANIGRAMA ============ -->
    <section class="section section--white" ref="equipoRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: equipoVisible }">👥 Nuestro equipo</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: equipoVisible }">Tú formas parte de nosotros</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: equipoVisible }">
          Detrás de cada pedido hay personas reales que se preocupan por ti.
        </p>
        <div class="org__tree">
          <!-- Nivel 1 -->
          <div class="org__level fade-up delay-1" :class="{ visible: equipoVisible }">
            <div class="org__card org__card--main">
              <div class="org__avatar">👑</div>
              <strong>Fundadora</strong>
              <span>Andrea Esqueda Rosario</span>
            </div>
          </div>
          <div class="org__connector"></div>
          <!-- Nivel 2 -->
          
          <div class="org__level org__level--two fade-up delay-2" :class="{ visible: equipoVisible }">
            <div class="org__card">
              <div class="org__avatar">🌸</div>
              <strong>Administradora de apoyo</strong>
              <span>Melissa Esparza</span>
            </div>
            <div class="org__card">
              <div class="org__avatar">💻</div>
              <strong>Desarrollo Front/Back</strong>
              <span>Ing. Juan Martín Esparza de la Cruz</span>
            </div>
          </div>
          <div class="org__connector"></div>
          <!-- Nivel 3 -->
          <div class="org__level fade-up delay-3" :class="{ visible: equipoVisible }">
            <div class="org__card org__card--community">
              <div class="org__avatar">🌸</div>
              <strong>¡Tú, nuestra comunidad!</strong>
              <span>Sin ti, nada de esto existiría</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ REDES SOCIALES ============ -->
    <section class="section section--pink" ref="redesRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: redesVisible }">📱 Síguenos</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: redesVisible }">Encuéntranos en redes</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: redesVisible }">
          Estamos activos todos los días. Sigue nuestro contenido, entérate de drops y hazte parte de la comunidad.
        </p>
        <div class="social__grid">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank"
             class="social__card fade-up" :class="{ visible: redesVisible }" :style="{ '--delay': social.delay }">
            <div class="social__icon" :style="{ background: social.gradient }">
              {{ social.emoji }}
            </div>
            <div class="social__info">
              <strong>{{ social.name }}</strong>
              <span>{{ social.handle }}</span>
              <p>{{ social.desc }}</p>
            </div>
            <span class="social__arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ============ CLIENTES ============ -->
    <section class="section section--white" ref="clientesRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: clientesVisible }">💖 Comunidad</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: clientesVisible }">Nuestros clientes felices</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: clientesVisible }">
          Ellos ya confiaron en nosotros. ¡Únete a la familia FLWRSTORE!
        </p>

        <!-- Carrusel de testimonios -->
        <div class="testimonials__track fade-up delay-2" :class="{ visible: clientesVisible }">
          <div class="testimonials__inner" :style="{ transform: `translateX(-${activeTestimonial * 320}px)` }">
            <div v-for="(t, i) in testimonials" :key="i" class="testimonial__card">
              <div class="testimonial__header">
                <div class="testimonial__avatar">{{ t.emoji }}</div>
                <div>
                  <strong>{{ t.name }}</strong>
                  <span>{{ t.location }}</span>
                </div>
              </div>
              <p>{{ t.text }}</p>
              <div class="testimonial__stars">⭐⭐⭐⭐⭐</div>
              <div class="testimonial__tag">{{ t.product }}</div>
            </div>
          </div>
        </div>
        <div class="testimonials__dots">
          <button v-for="(_, i) in testimonials" :key="i"
            class="dot" :class="{ active: activeTestimonial === i }"
            @click="activeTestimonial = i"></button>
        </div>

        <!-- Fotos de clientes (placeholders) -->
        <div class="clients__photos fade-up delay-3" :class="{ visible: clientesVisible }">
          <div v-for="i in 6" :key="i" class="client__photo">
            <div class="client__photo-inner">{{ clientEmojis[i-1] }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ ENTREGAS / MAPA ============ -->
    <section class="section section--dark" ref="mapaRef">
      <div class="section__inner">
        <div class="section__tag section__tag--light fade-up" :class="{ visible: mapaVisible }">🚚 Entregas</div>
        <h2 class="section__title section__title--light fade-up delay-1" :class="{ visible: mapaVisible }">¿Dónde entregamos?</h2>
        <p class="section__desc section__desc--light fade-up delay-2" :class="{ visible: mapaVisible }">
          Entregamos en Aguascalientes y enviamos a toda la república vía paquetería.
        </p>
        <div class="delivery__grid">
          <div class="delivery__info fade-left" :class="{ visible: mapaVisible }">
            <div class="delivery__item" v-for="d in deliveryZones" :key="d.zone">
              <div class="delivery__icon">{{ d.icon }}</div>
              <div>
                <strong>{{ d.zone }}</strong>
                <span>{{ d.desc }}</span>
              </div>
            </div>
          </div>
          <div class="delivery__map fade-right" :class="{ visible: mapaVisible }">
            <div class="map__wrapper">
              <iframe
                :src="mapUrl"
                width="100%"
                height="100%"
                style="border:0; border-radius: 20px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p class="map__note">📍 Aguascalientes, Aguascalientes, México</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CTA FINAL ============ -->
    <section class="section section--gradient" ref="ctaRef">
      <div class="section__inner cta__inner fade-up" :class="{ visible: ctaVisible }">
        <span class="big-emoji-cta">🌸</span>
        <h2>¿Lista para tu próxima compra?</h2>
        <p>Descubre el stock disponible y aparta lo que más te guste antes de que se agote.</p>
        <router-link to="/stock" class="btn-white btn-lg">Ver Stock disponible →</router-link>
      </div>
    </section>

    <!-- ============ COMENTARIOS ============ -->
    <section class="section section--cream" ref="comentariosRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: comentariosVisible }">💬 Comunidad</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: comentariosVisible }">Lo que dicen nuestras clientas</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: comentariosVisible }">
          Reseñas reales de personas que ya compraron en FLWR STORE 🌸
        </p>

        <div class="comments__grid fade-up delay-2" :class="{ visible: comentariosVisible }">
          <div v-for="(c, i) in comentarios" :key="i" class="comment__card" :style="{ '--i': i }">
            <div class="comment__header">
              <div class="comment__avatar">{{ c.emoji }}</div>
              <div class="comment__meta">
                <strong>{{ c.nombre }}</strong>
                <span>{{ c.ciudad }}</span>
              </div>
              <div class="comment__stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="comment__text">"{{ c.texto }}"</p>
            <div class="comment__product">
              <span>{{ catEmoji[c.categoria] }}</span>
              {{ c.producto }}
            </div>
            <div class="comment__date">{{ c.fecha }}</div>
          </div>
        </div>

        <!-- Formulario de comentario (solo usuarios logueados) -->
        <div v-if="usuarioActual" class="comment__form fade-up delay-3" :class="{ visible: comentariosVisible }">
          <h3>¿Ya compraste? Deja tu reseña 💗</h3>
          <div class="comment__form-inner">
            <textarea
              v-model="nuevoComentario.texto"
              placeholder="Cuéntanos tu experiencia..."
              maxlength="200"
            ></textarea>
            <div class="comment__form-footer">
              <span class="char-count">{{ nuevoComentario.texto.length }}/200</span>
              <button class="btn-primary" @click="enviarComentario" :disabled="!nuevoComentario.texto.trim()">
                Publicar reseña 🌸
              </button>
            </div>
          </div>
        </div>
        <div v-else class="comment__login-prompt fade-up delay-3" :class="{ visible: comentariosVisible }">
          <span>🌸</span>
          <p>¿Ya compraste con nosotros? <router-link to="/login" class="link-pink">Inicia sesión</router-link> para dejar tu reseña.</p>
        </div>

      </div>
    </section>

    <!-- ============ FOOTER ============ -->
    <footer class="footer">
      <div class="footer__inner">

        <div class="footer__brand">
          <div class="footer__logo">FLWR 🌸 STORE</div>
          <p>Tu tienda K-Pop de confianza.<br>Hecho con amor desde Aguascalientes 💖</p>
          <div class="footer__socials">
            <a href="https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg==" target="_blank" class="footer__social">📸</a>
            <a href="https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t" target="_blank" class="footer__social">💬</a>
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
        <p>© {{ new Date().getFullYear() }} FLWR STORE · Andrea Esqueda · Todos los derechos reservados.</p>
        <p>Diseño y desarrollo web por <strong>Ing. Juan Martín Esparza de la Cruz</strong></p>
      </div>
    </footer>

    <!-- ============ BOTÓN SCROLL TOP ============ -->
    <Transition name="scroll-btn">
      <button v-if="showScrollTop" class="scroll-top" @click="scrollToTop" title="Volver arriba">
        🌸
      </button>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usuarioActual } from '../composables/useAuth'

// ── Floating petals ─────────────────────────────────────────
const petalStyle = (i) => ({
  '--x': `${Math.random() * 100}%`,
  '--delay': `${i * 0.6}s`,
  '--duration': `${6 + Math.random() * 6}s`,
  '--size': `${0.8 + Math.random() * 1.2}rem`,
})

// ── Intersection Observer para animaciones ──────────────────
const heroRef = ref(null), heroVisible = ref(false)
const quienesRef = ref(null), quienesVisible = ref(false)
const equipoRef = ref(null), equipoVisible = ref(false)
const redesRef = ref(null), redesVisible = ref(false)
const clientesRef = ref(null), clientesVisible = ref(false)
const mapaRef = ref(null), mapaVisible = ref(false)
const ctaRef = ref(null), ctaVisible = ref(false)
const comentariosRef     = ref(null)
const comentariosVisible = ref(false)
const showScrollTop = ref(false)


const sections = [
  [heroRef, heroVisible],
  [quienesRef, quienesVisible],
  [equipoRef, equipoVisible],
  [redesRef, redesVisible],
  [clientesRef, clientesVisible],
  [mapaRef, mapaVisible],
  [ctaRef, ctaVisible],
  [comentariosRef, comentariosVisible],
]

let observer
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const found = sections.find(([r]) => r.value === e.target)
      if (found && e.isIntersecting) found[1].value = true
    })
  }, { threshold: 0.15 })

  sections.forEach(([r]) => { if (r.value) observer.observe(r.value) })
  // Trigger hero de inmediato
  setTimeout(() => { heroVisible.value = true }, 200)
})
onUnmounted(() => observer?.disconnect())

// ── Redes sociales ──────────────────────────────────────────
const socials = [
  {
    name: 'Instagram',
    handle: '@its.flwr_store',
    emoji: '📸',
    gradient: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    url: 'https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg==',
    desc: 'Fotos de productos, unboxings y novedades',
    delay: '0s'
  },
  {
    name: 'WhatsApp',
    handle: 'Canal oficial de ventas',
    emoji: '💬',
    gradient: 'linear-gradient(135deg,#25D366,#128C7E)',
    url: 'https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t',
    desc: 'Únete para ver el stock y hacer pedidos',
    delay: '0.1s'
  },
]

// ── Testimonios ─────────────────────────────────────────────
const activeTestimonial = ref(0)
const testimonials = [
  { name: 'Valeria R.', location: 'Guadalajara', emoji: '🌸', text: '¡Súper rápido y todo llegó perfectamente empaquetado! Ya hice mi segunda compra 💖', product: 'Album - TWICE', stars: 5 },
  { name: 'Camila T.', location: 'CDMX', emoji: '🎀', text: 'Las photocards llegaron en perfecto estado y el packaging es muy bonito. 100% recomendada', product: 'Photocard set - BTS', stars: 5 },
  { name: 'Fernanda L.', location: 'Monterrey', emoji: '✨', text: 'Me atendieron súper bien por WhatsApp y resolvieron todas mis dudas. ¡Ya soy cliente fija!', product: 'Peluche - Stray Kids', stars: 5 },
  { name: 'Sofía M.', location: 'Aguascalientes', emoji: '💗', text: 'Entrega el mismo día en Aguascalientes, ¡no lo podía creer! Todo perfecto como siempre.', product: 'Album - BLACKPINK', stars: 5 },
]

const catEmoji = {
  'Álbumes': '🎵', 'Photocards': '📸',
  'Peluches': '🧸', 'Lightsticks': '✨', 'Revistas': '📖',
}

const comentarios = ref([
  { emoji: '🌸', nombre: 'Valeria R.', ciudad: 'Guadalajara', texto: '¡Todo llegó perfectamente empaquetado! Súper rápido y Andrea es muy amable. Ya hice mi segunda compra 💖', producto: 'Ready to Be — TWICE', categoria: 'Álbumes', fecha: 'Abril 2025' },
  { emoji: '🎀', nombre: 'Camila T.', ciudad: 'CDMX', texto: 'Las photocards llegaron en perfecto estado, con fundas protectoras. El packaging es muy bonito. 100% recomendada.', producto: 'Photocard set — BTS', categoria: 'Photocards', fecha: 'Marzo 2025' },
  { emoji: '✨', nombre: 'Fernanda L.', ciudad: 'Monterrey', texto: 'Me atendieron súper bien por WhatsApp, resolvieron todas mis dudas. ¡Ya soy cliente fija! El peluche llegó intacto.', producto: 'Skzoo Ryan — Stray Kids', categoria: 'Peluches', fecha: 'Marzo 2025' },
  { emoji: '💗', nombre: 'Sofía M.', ciudad: 'Aguascalientes', texto: 'Entrega el mismo día en Ags, ¡no lo podía creer! Todo perfecto, el álbum sellado y con todas las inclusiones.', producto: 'Born Pink — BLACKPINK', categoria: 'Álbumes', fecha: 'Febrero 2025' },
  { emoji: '🌷', nombre: 'Daniela F.', ciudad: 'León', texto: 'El envío llegó en 3 días y muy bien protegido. Precios muy accesibles comparado con otras tiendas. ¡Volveré pronto!', producto: 'Lightstick — ATEEZ', categoria: 'Lightsticks', fecha: 'Enero 2025' },
  { emoji: '💖', nombre: 'Karen V.', ciudad: 'Querétaro', texto: 'Primera compra y quedé encantada. La comunicación fue excelente y el producto llegó exactamente como se describía.', producto: 'PC Karina — aespa', categoria: 'Photocards', fecha: 'Enero 2025' },
])

const nuevoComentario = ref({ texto: '' })

const enviarComentario = () => {
  if (!nuevoComentario.value.texto.trim()) return
  comentarios.value.unshift({
    emoji:     '🌸',
    nombre:    usuarioActual.value?.displayName || usuarioActual.value?.email?.split('@')[0] || 'Cliente',
    ciudad:    'México',
    texto:     nuevoComentario.value.texto.trim(),
    producto:  'Compra verificada',
    categoria: 'Álbumes',
    fecha:     new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }),
  })
  nuevoComentario.value.texto = ''
  mostrarToast('¡Gracias por tu reseña! 🌸', 'success')
}

// Auto-avanzar testimonios
let testimonialTimer
onMounted(() => {
  testimonialTimer = setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 4000)
})
onUnmounted(() => clearInterval(testimonialTimer))

// ── Zonas de entrega ────────────────────────────────────────
const deliveryZones = [
  { icon: '📍', zone: 'Entrega personal', desc: 'Frente al Templo de San José, Lic. Francisco Primo Verdad 205, Zona Centro, Aguascalientes' },
  { icon: '🛵', zone: 'Envío local', desc: 'Por Uber o DiDi dentro de Aguascalientes' },
  { icon: '📮', zone: 'Envío nacional', desc: 'Correos de México o Estafeta vía Lolapay a toda la república' },
  { icon: '💸', zone: 'Envío gratis', desc: 'En compras mayores a $550 MXN dentro de Aguascalientes' },
]

// ── Mapa ─────────────────────────────────────────────────────
// Embed de Google Maps centrado en Aguascalientes (sin API key, embed público)
const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.5!2d-102.29614!3d21.88237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ef9c5d7b9fcb%3A0x0!2sLic.+Francisco+Primo+Verdad+205%2C+Zona+Centro%2C+Aguascalientes!5e0!3m2!1ses!2smx!4v1'</script>

// ── Scroll top ────────────────────────────────────────────────
const handleScrollTop = () => {
  showScrollTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollTop)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollTop)
})

<style scoped>
/* ─── Base ─────────────────────────────────────────────────── */
.home { overflow-x: hidden; }

/* ─── Animaciones de scroll ────────────────────────────────── */
.fade-up    { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-left  { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible, .fade-left.visible, .fade-right.visible { opacity: 1; transform: none; }
.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.3s; }
.delay-3 { transition-delay: 0.45s; }

/* ─── Sections base ────────────────────────────────────────── */
.section { padding: 100px 24px; }
.section--cream   { background: var(--cream); }
.section--white   { background: #fff; }
.section--pink    { background: linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%); }
.section--dark    { background: var(--dark); }
.section--gradient { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); text-align: center; }

.section__inner { max-width: 1200px; margin: 0 auto; }
.section__tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--pink-accent);
  background: rgba(233,30,140,.1);
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 16px;
}
.section__tag--light { color: var(--pink-mid); background: rgba(244,143,177,.15); }
.section__title { font-size: clamp(1.8rem, 4vw, 3rem); margin-bottom: 16px; color: var(--text); }
.section__title--light { color: #000000; }
.section__desc { font-size: 1.05rem; color: var(--text-light); max-width: 600px; line-height: 1.7; }
.section__desc--light { color: rgba(0, 0, 0, 0.75); }

/* ─── HERO ─────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 5vw 60px;
  position: relative;
  overflow: hidden;
  gap: 40px;
}

.hero__bg-blobs { position: absolute; inset: 0; pointer-events: none; }
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: blobFloat 8s ease-in-out infinite alternate;
}
.blob--1 { width: 500px; height: 500px; background: rgba(244,143,177,.35); top: -100px; right: -100px; }
.blob--2 { width: 350px; height: 350px; background: rgba(233,30,140,.15); bottom: 0; left: 5%; animation-delay: 2s; }
.blob--3 { width: 250px; height: 250px; background: rgba(252,228,236,.8); top: 40%; left: 30%; animation-delay: 4s; }

@keyframes blobFloat {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.1) translate(20px, -30px); }
}

.hero__petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.floating-petal {
  position: absolute;
  left: var(--x);
  top: -20px;
  font-size: var(--size);
  opacity: 0;
  animation: petalFall var(--duration) var(--delay) ease-in infinite;
}
@keyframes petalFall {
  0%  { opacity: 0; transform: translateY(0) rotate(0deg); }
  10% { opacity: 0.6; }
  90% { opacity: 0.3; }
  100%{ opacity: 0; transform: translateY(110vh) rotate(360deg); }
}

.hero__content { position: relative; z-index: 2; max-width: 580px; }
.hero__badge {
  display: inline-block;
  background: rgba(233,30,140,.1);
  border: 1px solid rgba(233,30,140,.2);
  color: var(--pink-deep);
  font-size: 0.85rem;
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 24px;
  font-weight: 500;
}
.hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--text);
}
.hero__brand {
  color: var(--pink-accent);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.hero__brand-icon {
  display: inline-block;
  animation: spin 4s linear infinite;
  font-style: normal;
}
@keyframes spin { to { transform: rotate(360deg); } }

.hero__sub { font-size: 1.1rem; color: var(--text-light); line-height: 1.7; margin-bottom: 32px; }

.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }

.hero__stats { display: flex; align-items: center; gap: 24px; }
.stat { display: flex; flex-direction: column; }
.stat strong { font-size: 1.5rem; color: var(--pink-accent); font-family: 'Playfair Display', serif; }
.stat span { font-size: 0.8rem; color: var(--text-light); }
.stat-divider { width: 1px; height: 40px; background: rgba(233,30,140,.2); }

/* Hero visual cards */
.hero__visual { position: relative; z-index: 2; flex-shrink: 0; }
.hero__card-stack { position: relative; width: 280px; height: 340px; }
.card-float {
  position: absolute;
  width: 200px;
  background: #fff;
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;
}
.card-float--back  { bottom: 0; right: 0; transform: rotate(8deg); opacity: 0.7; }
.card-float--mid   { bottom: 40px; right: 30px; transform: rotate(-4deg); opacity: 0.85; }
.card-float--front { bottom: 80px; right: 60px; transform: rotate(2deg); box-shadow: 0 20px 60px rgba(233,30,140,.25); }
.card-float:hover  { transform: rotate(0deg) translateY(-8px) !important; }
.card-img-placeholder { width: 100px; height: 100px; background: var(--pink-soft); border-radius: 14px; display:flex; align-items:center; justify-content:center; font-size: 2.5rem; }
.card-float span { font-size: 0.8rem; color: var(--text-light); text-align: center; }

/* ─── Botones globales ─────────────────────────────────────── */
.btn-primary {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #000000; border: none; padding: 14px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
  cursor: pointer; text-decoration: none; display: inline-block;
  box-shadow: 0 8px 25px rgba(233,30,140,.3);
  transition: all 0.3s ease;
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(233,30,140,.4); }
.btn-ghost {
  background: transparent; color: var(--pink-deep);
  border: 1.5px solid var(--pink-mid); padding: 14px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
  cursor: pointer; text-decoration: none; display: inline-block;
  transition: all 0.2s;
}
.btn-ghost:hover { background: var(--pink-soft); border-color: var(--pink-accent); }
.btn-white {
  background: #fff; color: var(--pink-accent);
  border: none; padding: 16px 36px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
  cursor: pointer; text-decoration: none; display: inline-block;
  box-shadow: 0 8px 30px rgba(0,0,0,.15);
  transition: all 0.3s;
}
.btn-white:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,0,0,.2); }
.btn-lg { padding: 16px 36px; font-size: 1rem; }

/* ─── QUIÉNES SOMOS ────────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-top: 40px;
}
.about__text p { color: var(--text-light); line-height: 1.8; margin-bottom: 16px; }
.about__values { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.value-pill {
  background: rgba(233,30,140,.08);
  border: 1px solid rgba(233,30,140,.15);
  color: var(--pink-deep);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
}
.about__img-frame { position: relative; }
.about__img-placeholder {
  background: linear-gradient(135deg, var(--pink-soft), #fff);
  border-radius: 30px;
  aspect-ratio: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; color: var(--text-light);
  border: 2px dashed rgba(233,30,140,.2);
  font-size: 0.9rem;
}
.big-emoji { font-size: 4rem; }
.about__img-deco {
  position: absolute; bottom: -20px; right: -20px;
  width: 100px; height: 100px;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border-radius: 20px; opacity: 0.2;
  z-index: -1;
}

/* ─── ORGANIGRAMA ──────────────────────────────────────────── */
.org__tree { display: flex; flex-direction: column; align-items: center; gap: 0; margin-top: 40px; }
.org__level { display: flex; justify-content: center; gap: 24px; }
.org__level--two { gap: 24px; }
.org__connector {
  width: 2px; height: 40px;
  background: linear-gradient(to bottom, var(--pink-mid), var(--pink-soft));
  margin: 0 auto;
}
.org__card {
  background: #fff;
  border: 1.5px solid rgba(233,30,140,.15);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  width: 180px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  box-shadow: 0 4px 20px rgba(233,30,140,.08);
  transition: transform 0.3s, box-shadow 0.3s;
}
.org__card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.org__card--main { background: linear-gradient(135deg, #fff0f5, #fce4ec); border-color: var(--pink-mid); width: 220px; }
.org__card--community { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); border-color: transparent; width: 260px; }
.org__card--community strong, .org__card--community span { color: #fff; }
.org__avatar { font-size: 2rem; }
.org__card strong { font-size: 0.95rem; color: var(--text); }
.org__card span { font-size: 0.78rem; color: var(--text-light); line-height: 1.4; }

/* ─── REDES SOCIALES ───────────────────────────────────────── */
.social__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; }
.social__card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  display: flex; align-items: center; gap: 16px;
  text-decoration: none; color: var(--text);
  box-shadow: 0 4px 20px rgba(0,0,0,.05);
  border: 1px solid rgba(233,30,140,.1);
  transition: all 0.3s;
  transition-delay: var(--delay);
}
.social__card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.social__icon { width: 56px; height: 56px; border-radius: 16px; display:flex; align-items:center; justify-content:center; font-size: 1.6rem; flex-shrink: 0; }
.social__info { flex: 1; }
.social__info strong { display: block; font-size: 0.95rem; color: var(--text); }
.social__info span  { display: block; font-size: 0.8rem; color: var(--pink-accent); margin-bottom: 4px; }
.social__info p     { font-size: 0.8rem; color: var(--text-light); }
.social__arrow { font-size: 1.2rem; color: var(--pink-mid); transition: transform 0.2s; }
.social__card:hover .social__arrow { transform: translateX(4px); }

/* ─── TESTIMONIOS ──────────────────────────────────────────── */
.testimonials__track { overflow: hidden; margin-top: 40px; }
.testimonials__inner { display: flex; gap: 20px; transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
.testimonial__card {
  flex: 0 0 300px;
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  border: 1.5px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
}
.testimonial__header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.testimonial__avatar { font-size: 2.2rem; }
.testimonial__header strong { display: block; font-size: 0.95rem; color: var(--text); }
.testimonial__header span  { font-size: 0.8rem; color: var(--text-light); }
.testimonial__card p { font-size: 0.9rem; color: var(--text-light); line-height: 1.6; margin-bottom: 12px; font-style: italic; }
.testimonial__stars { font-size: 1rem; margin-bottom: 8px; }
.testimonial__tag { display: inline-block; background: var(--pink-soft); color: var(--pink-deep); padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; }

.testimonials__dots { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pink-soft); border: none; cursor: pointer; transition: all 0.3s; }
.dot.active { background: var(--pink-accent); width: 24px; border-radius: 4px; }

.clients__photos { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 40px; }
.client__photo { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; border: 3px solid var(--pink-soft); transition: transform 0.3s; }
.client__photo:hover { transform: scale(1.1) rotate(5deg); border-color: var(--pink-mid); }
.client__photo-inner { width: 100%; height: 100%; background: linear-gradient(135deg, var(--pink-soft), #fce4ec); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }

/* ─── MAPA ─────────────────────────────────────────────────── */
.delivery__grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: center; margin-top: 40px; }
.delivery__item { display: flex; gap: 16px; align-items: flex-start; padding: 20px; border-radius: 16px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); margin-bottom: 12px; }
.delivery__icon { font-size: 2rem; flex-shrink: 0; }
.delivery__item strong { display: block; color: #000000; font-size: 0.95rem; margin-bottom: 4px; }
.delivery__item span   { font-size: 0.85rem; color: rgba(0, 0, 0, 0.6); }
.delivery__map { display: flex; flex-direction: column; gap: 12px; }
.map__wrapper { height: 380px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
.map__note { text-align: center; color: rgba(0, 0, 0, 0.6); font-size: 0.85rem; }

/* ─── CTA FINAL ─────────────────────────────────────────────── */
.cta__inner { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.cta__inner h2 { font-size: clamp(2rem, 4vw, 3rem); color: #000000; }
.cta__inner p  { color: rgba(0, 0, 0, 0.85); font-size: 1.1rem; max-width: 500px; text-align: center; }
.big-emoji-cta { font-size: 4rem; animation: bounce 2s infinite; display: block; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero { flex-direction: column; text-align: center; padding-top: 120px; }
  .hero__ctas { justify-content: center; }
  .hero__stats { justify-content: center; }
  .about__grid { grid-template-columns: 1fr; }
  .delivery__grid { grid-template-columns: 1fr; }
  .org__level--two { flex-direction: column; align-items: center; }
}

/* ─── COMENTARIOS ───────────────────────────────────────────── */
.comments__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.comment__card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  border: 1.5px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
  display: flex; flex-direction: column; gap: 12px;
  animation: cardIn 0.5s ease both;
  animation-delay: calc(var(--i) * 0.08s);
  transition: transform 0.3s, box-shadow 0.3s;
}
.comment__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(233,30,140,.12);
}

.comment__header {
  display: flex; align-items: center; gap: 12px;
}
.comment__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--pink-soft), #fce4ec);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
  border: 2px solid rgba(233,30,140,.15);
}
.comment__meta { flex: 1; }
.comment__meta strong { display: block; font-size: 0.92rem; color: var(--text); }
.comment__meta span   { font-size: 0.78rem; color: var(--text-light); }
.comment__stars { font-size: 0.75rem; }

.comment__text {
  font-size: 0.88rem; color: var(--text-light);
  line-height: 1.7; font-style: italic;
  flex: 1;
}

.comment__product {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(233,30,140,.08);
  border: 1px solid rgba(233,30,140,.15);
  color: var(--pink-deep); padding: 5px 12px;
  border-radius: 50px; font-size: 0.75rem; font-weight: 600;
  width: fit-content;
}

.comment__date { font-size: 0.72rem; color: var(--text-light); }

/* Formulario */
.comment__form {
  margin-top: 40px;
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  border: 1.5px solid rgba(233,30,140,.15);
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
}
.comment__form h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem; color: var(--text);
  margin-bottom: 16px;
}
.comment__form-inner { display: flex; flex-direction: column; gap: 12px; }
.comment__form textarea {
  width: 100%; min-height: 100px;
  padding: 14px 16px; border-radius: 14px;
  border: 1.5px solid rgba(233,30,140,.2);
  font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
  color: var(--text); resize: vertical; outline: none;
  transition: border-color 0.2s;
}
.comment__form textarea:focus {
  border-color: var(--pink-accent);
  box-shadow: 0 0 0 3px rgba(233,30,140,.08);
}
.comment__form-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
}
.char-count { font-size: 0.78rem; color: var(--text-light); }
.btn-primary {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; border: none; padding: 10px 24px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s;
  box-shadow: 0 6px 20px rgba(233,30,140,.28);
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.comment__login-prompt {
  margin-top: 32px;
  display: flex; align-items: center; gap: 14px;
  background: rgba(233,30,140,.05);
  border: 1px solid rgba(233,30,140,.12);
  border-radius: 16px; padding: 18px 22px;
  font-size: 0.9rem; color: var(--text-light);
}
.comment__login-prompt span { font-size: 1.5rem; }
.link-pink { color: var(--pink-accent); text-decoration: none; font-weight: 600; }

/* ─── FOOTER ─────────────────────────────────────────────────── */
.footer {
  background: var(--dark);
  padding: 60px 24px 0;
}
.footer__inner {
  max-width: 1200px; margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.footer__logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 700;
  letter-spacing: 4px; color: #fff;
  margin-bottom: 12px;
}
.footer__brand p {
  font-size: 0.88rem; color: rgba(255,255,255,.6);
  line-height: 1.7; margin-bottom: 20px;
}
.footer__socials { display: flex; gap: 10px; }
.footer__social {
  width: 40px; height: 40px; border-radius: 12px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; text-decoration: none;
  transition: all 0.2s;
}
.footer__social:hover {
  background: rgba(233,30,140,.3);
  border-color: var(--pink-mid);
  transform: translateY(-3px);
}

.footer__links { display: flex; flex-direction: column; gap: 10px; }
.footer__links h4 {
  font-size: 0.78rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--pink-mid);
  margin-bottom: 6px;
}
.footer__links a {
  font-size: 0.88rem; color: rgba(255,255,255,.6);
  text-decoration: none; transition: color 0.2s;
}
.footer__links a:hover { color: #fff; }

.footer__contact { display: flex; flex-direction: column; gap: 14px; }
.footer__contact h4 {
  font-size: 0.78rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--pink-mid);
  margin-bottom: 2px;
}
.footer__contact-item {
  display: flex; gap: 12px; align-items: flex-start;
}
.footer__contact-item span { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
.footer__contact-item strong { display: block; font-size: 0.85rem; color: #fff; margin-bottom: 2px; }
.footer__contact-item p { font-size: 0.78rem; color: rgba(255,255,255,.55); margin: 0; line-height: 1.5; }
.footer__contact-item a { font-size: 0.78rem; color: var(--pink-mid); text-decoration: none; }
.footer__contact-item a:hover { color: var(--pink-soft); }

.footer__bottom {
  max-width: 1200px; margin: 0 auto;
  padding: 20px 0 28px;
  display: flex; flex-wrap: wrap;
  justify-content: space-between; gap: 8px;
}
.footer__bottom p {
  font-size: 0.75rem; color: rgba(255,255,255,.35);
}
.footer__bottom strong { color: rgba(255,255,255,.55); }

/* ─── SCROLL TOP ─────────────────────────────────────────────── */
.scroll-top {
  position: fixed; bottom: 32px; left: 32px; z-index: 90;
  width: 48px; height: 48px; border-radius: 50%;
  background: #fff;
  border: 2px solid rgba(233,30,140,.2);
  font-size: 1.4rem; cursor: pointer;
  box-shadow: 0 8px 24px rgba(233,30,140,.2);
  transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
  display: flex; align-items: center; justify-content: center;
}
.scroll-top:hover {
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 14px 32px rgba(233,30,140,.3);
  border-color: var(--pink-accent);
}

.scroll-btn-enter-active { transition: all 0.4s cubic-bezier(.34,1.56,.64,1); }
.scroll-btn-leave-active { transition: all 0.2s ease; }
.scroll-btn-enter-from, .scroll-btn-leave-to { opacity: 0; transform: scale(0.5) translateY(20px); }

@media (max-width: 768px) {
  .footer__inner { grid-template-columns: 1fr; gap: 32px; }
  .footer__bottom { flex-direction: column; text-align: center; }
  .comments__grid { grid-template-columns: 1fr; }
}

</style>