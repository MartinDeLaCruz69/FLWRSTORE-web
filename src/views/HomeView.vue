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
        <span v-for="i in 30" :key="i" class="floating-petal" :style="petalStyle(i)">🌸</span>
      </div>

      <div class="hero__content fade-up" :class="{ visible: heroVisible }">
        <h1 class="hero__title">
          Bienvenida(o) a<br>
          <span class="hero__brand">FLWR<span class="hero__brand-icon">🌸</span>STORE</span>
        </h1>
        <p class="hero__sub">
          Albums, photocards, peluches y mucho más.<br>
          Todo con amor, desde Aguascalientes para ti.
        </p>
        <div class="hero__ctas">
          <router-link to="/stock" class="btn-primary btn-lg">Ver Stock disponible</router-link>
          <a href="#quienes-somos" class="btn-ghost btn-lg" @click.prevent="scrollToSection">¡CONÓCENOS! ↓</a>
        </div>
        <div class="hero__stats">
          <div class="stat"><strong>+500</strong><span>Pedidos entregados</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><strong>99.9%</strong><span>Clientes felices</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><strong>+2 años</strong><span>En el mercado</span></div>
        </div>
      </div>

      <div class="hero__visual fade-right" :class="{ visible: heroVisible }">
        <div class="hero__card-stack">
          <div class="card-float card-float--back">
            <div class="card-img-wrap">
              <img v-if="heroCards[2].img" :src="heroCards[2].img" :alt="heroCards[2].label" class="card-img" />
              <div v-else class="card-img-placeholder">{{ heroCards[2].emoji }}</div>
            </div>
            <span>{{ heroCards[2].label }}</span>
          </div>
          <div class="card-float card-float--mid">
            <div class="card-img-wrap">
              <img v-if="heroCards[1].img" :src="heroCards[1].img" :alt="heroCards[1].label" class="card-img" />
              <div v-else class="card-img-placeholder">{{ heroCards[1].emoji }}</div>
            </div>
            <span>{{ heroCards[1].label }}</span>
          </div>
          <div class="card-float card-float--front">
            <div class="card-img-wrap">
              <img v-if="heroCards[0].img" :src="heroCards[0].img" :alt="heroCards[0].label" class="card-img" />
              <div v-else class="card-img-placeholder">{{ heroCards[0].emoji }}</div>
            </div>
            <span>{{ heroCards[0].label }}</span>
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
            <p>Cada producto que ofrecemos ha sido cuidadosamente seleccionado para ti. Nos aseguramos de entregarte tu pedido en buenas condiciones, con el mismo amor con el que fue elegido.</p>
            <p>Más que una tienda, somos una comunidad 🌸</p>
            <div class="about__values">
              <div class="value-pill fade-up delay-1" :class="{ visible: quienesVisible }">🎁 Empaque seguro</div>
              <div class="value-pill fade-up delay-2" :class="{ visible: quienesVisible }">💌 Atención personalizada</div>
              <div class="value-pill fade-up delay-3" :class="{ visible: quienesVisible }">⚡ Entregas personales y en línea</div>
              <div class="value-pill fade-up delay-4" :class="{ visible: quienesVisible }">🌟 Productos originales</div>
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
          <div class="org__level fade-up delay-1" :class="{ visible: equipoVisible }">
            <div class="org__card org__card--main">
              <div class="org__avatar">👑</div>
              <strong>Fundadora</strong>
              <span>Andrea Esqueda Rosario</span>
            </div>
          </div>
          <div class="org__connector fade-up" :class="{ visible: equipoVisible }"></div>
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
          <div class="org__connector fade-up" :class="{ visible: equipoVisible }"></div>
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
          Estamos activas todos los días. Sigue nuestro contenido, entérate de drops y hazte parte de la comunidad.
        </p>
        <div class="social__grid">
          <a v-for="(social, i) in socials" :key="social.name" :href="social.url" target="_blank"
             class="social__card fade-up" :class="{ visible: redesVisible }"
             :style="{ transitionDelay: (i * 0.12) + 's' }">
            <div class="social__icon" :style="{ background: social.gradient }">{{ social.emoji }}</div>
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

    <!-- ============ TESTIMONIOS ============ -->
    <section class="section section--white" ref="clientesRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: clientesVisible }">💖 Comunidad</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: clientesVisible }">Nuestros clientes felices</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: clientesVisible }">
          Ellos ya confiaron en nosotros. ¡Únete a la familia FLWRSTORE!
        </p>

        <!-- Estado vacío — sin testimonios aún -->
        <div v-if="testimonials.length === 0" class="testimonials__empty fade-up delay-2" :class="{ visible: clientesVisible }">
          <span>🌸</span>
          <p>Próximamente aquí verás los comentarios de nuestros clientes.</p>
        </div>

        <!-- Carrusel — solo si hay testimonios -->
        <template v-else>
          <div class="testimonials__wrap fade-up delay-2" :class="{ visible: clientesVisible }">
            <button class="testimonials__nav" @click="prevTestimonial">‹</button>
            <div class="testimonials__track">
              <div class="testimonials__inner" :style="{ transform: `translateX(-${activeTestimonial * testimonialesOffset}px)` }">
                <div
                  v-for="(t, i) in testimonials" :key="t.id || i"
                  class="testimonial__card"
                  :class="{ active: activeTestimonial === i }"
                >
                  <div class="testimonial__img-wrap">
                    <img v-if="t.foto" :src="t.foto" :alt="t.name" class="testimonial__img" />
                    <div v-else class="testimonial__img testimonial__img--placeholder">{{ t.emoji || '🌸' }}</div>
                  </div>
                  <div class="testimonial__header">
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
            <button class="testimonials__nav" @click="nextTestimonial">›</button>
          </div>

          <div class="testimonials__dots">
            <button
              v-for="(_, i) in testimonials" :key="i"
              class="dot"
              :class="{ active: activeTestimonial === i }"
              @click="activeTestimonial = i"
            ></button>
          </div>
        </template>

        <!-- Panel admin — agregar y gestionar testimonios -->
        <div v-if="esAdmin" class="admin__panel fade-up delay-3" :class="{ visible: clientesVisible }">
          <div class="admin__panel-header">
            <span>🛠️</span>
            <h3>Agregar testimonio (Admin)</h3>
          </div>
          <div class="admin__form">
            <div class="admin__form-row">
              <input v-model="nuevoTestimonio.name" placeholder="Nombre del cliente *" class="admin__input" />
              <input v-model="nuevoTestimonio.location" placeholder="Ciudad" class="admin__input" />
            </div>
            <input v-model="nuevoTestimonio.product" placeholder="Producto comprado" class="admin__input" />
            <textarea v-model="nuevoTestimonio.text" placeholder="Testimonio del cliente... *" class="admin__textarea" maxlength="200"></textarea>

            <!-- Upload de foto — stopPropagation para evitar conflictos -->
            <div class="admin__upload" @click.stop="triggerFotoUpload" :class="{ 'has-foto': fotoPreview }">
              <input ref="fotoInput" type="file" accept="image/*" style="display:none" @change="handleFotoUpload" />
              <div v-if="!fotoPreview" class="admin__upload-placeholder">
                <span>📷</span>
                <p>Haz clic para subir foto del cliente con su producto</p>
              </div>
              <img v-else :src="fotoPreview" alt="Preview" class="admin__upload-preview" />
              <button v-if="fotoPreview" class="admin__upload-remove" @click.stop="removeFoto">✕</button>
            </div>

            <div class="admin__form-footer">
              <span class="char-count">{{ nuevoTestimonio.text.length }}/200</span>
              <button
                class="btn-primary"
                @click="agregarTestimonio"
                :disabled="!nuevoTestimonio.name || !nuevoTestimonio.text.trim() || guardandoTestimonio"
              >
                <span v-if="!guardandoTestimonio">Publicar testimonio 🌸</span>
                <span v-else>Guardando...</span>
              </button>
            </div>
          </div>

          <!-- Lista de testimonios existentes con opción de eliminar -->
          <div v-if="testimonials.length > 0" class="admin__testimonios-lista">
            <p class="admin__lista-titulo">📋 Testimonios publicados ({{ testimonials.length }})</p>
            <div v-for="t in testimonials" :key="t.id" class="admin__testimonio-item">
              <div class="admin__testimonio-info">
                <div class="admin__testimonio-avatar">
                  <img v-if="t.foto" :src="t.foto" :alt="t.name" />
                  <span v-else>{{ t.emoji || '🌸' }}</span>
                </div>
                <div>
                  <strong>{{ t.name }}</strong>
                  <span>{{ t.location }} · {{ t.product }}</span>
                  <p>{{ t.text }}</p>
                </div>
              </div>
              <button class="admin__testimonio-delete" @click="eliminarTestimonio(t.id)" title="Eliminar">
                🗑️
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ============ COMENTARIOS ============ -->
    <section class="section section--review" ref="comentariosRef">
      <div class="section__inner">

        <!-- FORM para clientes logueados (no admins) -->
        <div v-if="usuarioActual && !esAdmin"
            class="comment__form fade-up"
            :class="{ visible: comentariosVisible }">
          <h3>¿Tienes algún comentario? 💗</h3>
          <p class="comment__form-desc">
            Cuéntanos tu experiencia, sugerencias o lo que quieras decirnos.
            Nuestro equipo lo leerá pronto. 🌸
          </p>
          <div class="comment__form-inner">
            <textarea
              v-model="nuevoComentario.texto"
              placeholder="Escribe tu comentario aquí..."
              maxlength="300"
              :disabled="enviandoComentario"
            ></textarea>
            <div class="comment__form-footer">
              <span class="char-count">{{ nuevoComentario.texto.length }}/300</span>
              <button
                class="btn-primary"
                @click="enviarComentarioHandler"
                :disabled="!nuevoComentario.texto.trim() || enviandoComentario"
              >
                <span v-if="!enviandoComentario">Enviar comentario 🌸</span>
                <span v-else>Enviando...</span>
              </button>
            </div>
            <!-- Confirmación -->
            <div v-if="comentarioEnviado" class="comment__success">
              ✅ ¡Gracias por tu comentario! Nuestro equipo lo leerá pronto. 💖
            </div>
          </div>
        </div>

        <!-- PANEL ADMIN para ver comentarios -->
        <div v-if="esAdmin" class="comment__admin fade-up" :class="{ visible: comentariosVisible }">
          <div class="comment__admin-header">
            <div>
              <h3>📬 Comentarios de clientes</h3>
              <span class="comment__admin-badge" v-if="noLeidos > 0">
                {{ noLeidos }} sin leer
              </span>
            </div>
            <button class="btn-ghost-sm" @click="filtroLeidos = !filtroLeidos">
              {{ filtroLeidos ? 'Ver todos' : 'Solo no leídos' }}
            </button>
          </div>

          <!-- Sin comentarios -->
          <div v-if="comentariosFiltrados.length === 0" class="comment__admin-empty">
            <span>💬</span>
            <p>{{ filtroLeidos ? 'No hay comentarios sin leer' : 'Aún no hay comentarios' }}</p>
          </div>

          <!-- Lista -->
          <div v-else class="comment__admin-list">
            <div
              v-for="c in comentariosFiltrados"
              :key="c.id"
              class="comment__admin-item"
              :class="{ 'comment__admin-item--nuevo': !c.leido }"
            >
              <div class="comment__admin-item-header">
                <div class="comment__admin-avatar">{{ c.nombreAutor?.charAt(0).toUpperCase() }}</div>
                <div>
                  <strong>{{ c.nombreAutor }}</strong>
                  <span class="comment__admin-email">{{ c.autor }}</span>
                </div>
                <span class="comment__admin-fecha">
                  {{ c.fecha?.toDate?.()?.toLocaleDateString('es-MX', { day:'numeric', month:'short', year:'numeric' }) || '—' }}
                </span>
                <span v-if="!c.leido" class="comment__admin-new-badge">Nuevo</span>
              </div>
              <p class="comment__admin-texto">{{ c.texto }}</p>
              <button v-if="!c.leido" class="btn-marcar-leido" @click="marcarLeidoHandler(c.id)">
                ✓ Marcar como leído
              </button>
            </div>
          </div>
        </div>

        <!-- Prompt para no logueados -->
        <div v-else-if="!usuarioActual" class="comment__login-prompt fade-up" :class="{ visible: comentariosVisible }">
          <span>🌸</span>
          <p>¿Tienes algún comentario o sugerencia? <router-link to="/login" class="link-pink">Inicia sesión</router-link> para escribirnos.</p>
        </div>

      </div>
    </section>

    <!-- ============ ENTREGAS / MAPA ============ -->
    <section class="section section--cream-alt" ref="mapaRef">
      <div class="section__inner">
        <div class="section__tag fade-up" :class="{ visible: mapaVisible }">🚚 Entregas</div>
        <h2 class="section__title fade-up delay-1" :class="{ visible: mapaVisible }">¿Dónde entregamos?</h2>
        <p class="section__desc fade-up delay-2" :class="{ visible: mapaVisible }">
          Entregamos en Aguascalientes y enviamos a toda la república vía paquetería.
        </p>
        <div class="delivery__grid">
          <div class="delivery__info fade-left" :class="{ visible: mapaVisible }">
            <div class="delivery__item fade-up" v-for="(d, i) in deliveryZones" :key="d.zone"
                 :class="{ visible: mapaVisible }" :style="{ transitionDelay: (i * 0.1) + 's' }">
              <div class="delivery__icon">{{ d.icon }}</div>
              <div><strong>{{ d.zone }}</strong><span>{{ d.desc }}</span></div>
            </div>
          </div>
          <div class="delivery__map fade-right" :class="{ visible: mapaVisible }">
            <div class="map__wrapper">
              <iframe :src="mapUrl" width="100%" height="100%" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <p class="map__note">📍 Aguascalientes, Aguascalientes, México</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CTA FINAL ============ -->
    <section class="section section--cta-rose" ref="ctaRef">
      <div class="section__inner cta__inner fade-up" :class="{ visible: ctaVisible }">
        <span class="big-emoji-cta">🌸</span>
        <h2>¿Lista para tu próxima compra?</h2>
        <p>Descubre el stock disponible y aparta lo que más te guste antes de que se agote.</p>
        <router-link to="/stock" class="btn-cta-rose btn-lg">Ver Stock disponible →</router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch} from 'vue'
import { usuarioActual } from '../composables/useAuth'
import { rolActual } from '../composables/useAuth'
import { useComentarios } from '../composables/useComentarios'
import { useTestimonios } from '../composables/useTestimonios'

// Offset responsivo del carrusel
const windowWidth = ref(window.innerWidth)
const handleWindowResize = () => { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', handleWindowResize))
onUnmounted(() => window.removeEventListener('resize', handleWindowResize))

const testimonialesOffset = computed(() => {
  if (windowWidth.value <= 768) return windowWidth.value - 48 + 16 // card width + gap en mobile
  return 320 + 20 // desktop
})

// ── Admin ────────────────────────────────────────────────────
const esAdmin = computed(() =>
  rolActual.value === 'admin' || rolActual.value === 'subadmin'
)

// ── Hero cards (puedes poner URLs de imágenes reales) ─────────
const heroCards = ref([
  { emoji: '🎵', label: 'Álbumes',    img: 'https://images.squarespace-cdn.com/content/v1/62f53b668eb14457565e348d/98a27bc7-46cf-4645-b0fe-045d72562c4d/2026website.png' },
  { emoji: '📸', label: 'Photocards', img: 'https://discover-es.zenmarket.jp/assets/Products/Music-Entertainment/Kpop/Kpop-categories/Carholder-category-Kpop.webp' },
  { emoji: '🧸', label: 'Peluches',   img: 'https://i5.walmartimages.com/asr/2735e653-0c8a-4253-9697-d2542de51d7a.613dafe887f3587d4eeb830f54d8ff95.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
])

// ── Smooth scroll a sección ──────────────────────────────────
const scrollToSection = () => {
  const el = document.getElementById('quienes-somos')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Floating petals ──────────────────────────────────────────
const petalStyle = (i) => ({
  '--x':        `${(i * 37) % 100}%`,
  '--delay':    `${(i * 0.4) % 8}s`,
  '--duration': `${7 + (i % 5)}s`,
  '--size':     `${0.8 + (i % 3) * 0.4}rem`,
})

// ── Intersection Observer ────────────────────────────────────
const heroRef        = ref(null); const heroVisible        = ref(false)
const quienesRef     = ref(null); const quienesVisible     = ref(false)
const equipoRef      = ref(null); const equipoVisible      = ref(false)
const redesRef       = ref(null); const redesVisible       = ref(false)
const clientesRef    = ref(null); const clientesVisible    = ref(false)
const mapaRef        = ref(null); const mapaVisible        = ref(false)
const ctaRef         = ref(null); const ctaVisible         = ref(false)
const comentariosRef = ref(null); const comentariosVisible = ref(false)

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
  }, { threshold: 0.1 })
  sections.forEach(([r]) => { if (r.value) observer.observe(r.value) })
  setTimeout(() => { heroVisible.value = true }, 100)
})

onUnmounted(() => {
  observer?.disconnect()
  clearInterval(testimonialTimer)
  pararEscucha()
  pararEscuchaTestimonios()
})

// ── Redes ────────────────────────────────────────────────────
const socials = [
  { name: 'Instagram', handle: '@its.flwr_store', emoji: '📸', gradient: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', url: 'https://www.instagram.com/its.flwr_store?igsh=MThrMDR5cmZ2ZGxyMg==', desc: 'Fotos de productos, unboxings y novedades' },
  { name: 'WhatsApp', handle: 'Canal oficial de ventas', emoji: '💬', gradient: 'linear-gradient(135deg,#25D366,#128C7E)', url: 'https://chat.whatsapp.com/Le9ZLZRUiT02x0MbJh86mW?mode=gi_t', desc: 'Únete para ver el stock y hacer pedidos' },
]

// ── Testimonios ──────────────────────────────────────────────
// ── Testimonios desde Firestore ───────────────────────────────
const {
  testimonios: testimonials,
  escucharTestimonios,
  pararEscuchaTestimonios,
  agregarTestimonio: guardarTestimonio,
  eliminarTestimonio,
} = useTestimonios()

// Inicia escucha al montar
onMounted(() => { escucharTestimonios() })

// ── Formulario admin testimonio ──────────────────────────────
const fotoInput   = ref(null)
const fotoPreview = ref(null)
const fotoFile    = ref(null)
const guardandoTestimonio = ref(false)

const nuevoTestimonio = ref({
  name: '', location: '', product: '', text: '', emoji: '🌸'
})

const triggerFotoUpload = () => fotoInput.value?.click()

const handleFotoUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  fotoFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { fotoPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

const removeFoto = () => {
  fotoPreview.value = null
  fotoFile.value    = null
  if (fotoInput.value) fotoInput.value.value = ''
}

const agregarTestimonio = async () => {
  if (!nuevoTestimonio.value.name || !nuevoTestimonio.value.text.trim()) return
  guardandoTestimonio.value = true
  try {
    await guardarTestimonio(nuevoTestimonio.value, fotoPreview.value)
    // Ir al último testimonio
    activeTestimonial.value = testimonials.value.length - 1
    // Reset
    nuevoTestimonio.value = { name: '', location: '', product: '', text: '', emoji: '🌸' }
    removeFoto()
  } catch (e) {
    console.error('Error guardando testimonio:', e)
  } finally {
    guardandoTestimonio.value = false
  }
}



const activeTestimonial = ref(0)
const nextTestimonial = () => { activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length }
const prevTestimonial = () => { activeTestimonial.value = (activeTestimonial.value - 1 + testimonials.value.length) % testimonials.value.length }

let testimonialTimer
onMounted(() => { testimonialTimer = setInterval(nextTestimonial, 4500) })
onUnmounted(() => clearInterval(testimonialTimer))

// ── Entregas ─────────────────────────────────────────────────
const deliveryZones = [
  { icon: '📍', zone: 'Entrega personal', desc: 'Frente al Templo de San José, Lic. Francisco Primo Verdad 205, Zona Centro, Aguascalientes' },
  { icon: '🛵', zone: 'Envío local', desc: 'Por Uber o DiDi dentro de Aguascalientes' },
  { icon: '📮', zone: 'Envío nacional', desc: 'Correos de México o Estafeta vía Lolapay a toda la república' },
  { icon: '💸', zone: 'Envío gratis', desc: 'En compras mayores a $550 MXN dentro de Aguascalientes' },
]
const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.5!2d-102.29614!3d21.88237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ef9c5d7b9fcb%3A0x0!2sLic.+Francisco+Primo+Verdad+205%2C+Zona+Centro%2C+Aguascalientes!5e0!3m2!1ses!2smx!4v1'

// ── Comentarios ──────────────────────────────────────────────
const { comentarios, enviarComentario, escucharComentarios,
        pararEscucha, marcarLeido } = useComentarios()

const nuevoComentario   = ref({ texto: '' })
const enviandoComentario = ref(false)
const comentarioEnviado  = ref(false)
const filtroLeidos       = ref(false) // false = todos, true = solo no leídos

const noLeidos = computed(() =>
  comentarios.value.filter(c => !c.leido).length
)

const comentariosFiltrados = computed(() =>
  filtroLeidos.value
    ? comentarios.value.filter(c => !c.leido)
    : comentarios.value
)

watch(esAdmin, (val) => {
  if (val) escucharComentarios()
  else pararEscucha()
}, { immediate: true })

const enviarComentarioHandler = async () => {
  if (!nuevoComentario.value.texto.trim()) return
  enviandoComentario.value = true
  try {
    await enviarComentario(nuevoComentario.value.texto, usuarioActual.value)
    nuevoComentario.value.texto = ''
    comentarioEnviado.value = true
    setTimeout(() => { comentarioEnviado.value = false }, 4000)
  } catch (e) {
    console.error(e)
  } finally {
    enviandoComentario.value = false
  }
}

const marcarLeidoHandler = async (id) => {
  await marcarLeido(id)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.home {
  --pink-soft:   #fce4ec;
  --pink-mid:    #f48fb1;
  --pink-accent: #e91e8c;
  --pink-deep:   #c2185b;
  --cream:       #fff8f0;
  --dark:        #1a1a2e;
  --text:        #1a1a1a;
  --text-light:  #555;
  --shadow:      0 20px 60px rgba(233,30,140,.15);
  overflow-x: hidden;
}

/* ─── Animaciones de scroll ─────────────────────────────────── */
.fade-up    { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-left  { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible, .fade-left.visible, .fade-right.visible { opacity: 1; transform: none; }
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.22s; }
.delay-3 { transition-delay: 0.34s; }
.delay-4 { transition-delay: 0.46s; }

/* ─── Sections ──────────────────────────────────────────────── */
.section { padding: 100px 24px; }
.section--cream     { background: var(--cream); }
.section--white     { background: #fff; }
.section--pink      { background: linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%); }
.section--cream-alt { background: linear-gradient(160deg, #fff8f0 0%, #fdf0f7 100%); }
.section--cta-rose  {
  background: linear-gradient(135deg, #f8bbd0 0%, #f48fb1 50%, #ec407a 100%);
  text-align: center; position: relative; overflow: hidden;
}
.section--cta-rose::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,.18) 0%, transparent 60%);
  pointer-events: none;
}
.section--review { background: #fff; padding: 48px 24px 64px; }
.section--review .section__inner { max-width: 700px; }
.section__inner { max-width: 1200px; margin: 0 auto; }

.section__tag {
  display: inline-block; font-size: 0.8rem; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--pink-accent); background: rgba(233,30,140,.1);
  padding: 6px 16px; border-radius: 50px; margin-bottom: 16px;
}
.section__title { font-size: clamp(1.8rem, 4vw, 3rem); margin-bottom: 16px; color: var(--text); }
.section__desc  { font-size: 1.05rem; color: var(--text-light); max-width: 600px; line-height: 1.7; }

/* ─── HERO ──────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 90px 5vw 60px;   /* ← menos padding top */
  position: relative;
  overflow: hidden;
  gap: 40px;
  background: #fff;
}

.hero__bg-blobs { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45; animation: blobFloat 8s ease-in-out infinite alternate; }
.blob--1 { width: 500px; height: 500px; background: rgba(244,143,177,.35); top: -100px; right: -100px; }
.blob--2 { width: 350px; height: 350px; background: rgba(233,30,140,.15); bottom: 0; left: 5%; animation-delay: 2s; }
.blob--3 { width: 250px; height: 250px; background: rgba(252,228,236,.8); top: 40%; left: 30%; animation-delay: 4s; }
@keyframes blobFloat { from { transform: scale(1) translate(0,0); } to { transform: scale(1.1) translate(20px,-30px); } }

.hero__petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.floating-petal {
  position: absolute; left: var(--x); top: -20px; font-size: var(--size); opacity: 0;
  animation: petalFall var(--duration) var(--delay) ease-in infinite;
}
@keyframes petalFall {
  0%  { opacity: 0; transform: translateY(0) rotate(0deg); }
  10% { opacity: 0.5; }
  90% { opacity: 0.25; }
  100%{ opacity: 0; transform: translateY(110vh) rotate(360deg); }
}

.hero__content { position: relative; z-index: 2; max-width: 580px; }

.hero__badge {
  display: inline-block;
  background: rgba(233,30,140,.1); border: 1px solid rgba(233,30,140,.2);
  color: var(--pink-deep); font-size: 0.85rem; padding: 6px 16px;
  border-radius: 50px; margin-bottom: 20px; font-weight: 500;
}

.hero__title {
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  line-height: 1.1; margin-bottom: 18px; color: var(--text);
}
.hero__brand { color: var(--pink-accent); display: inline-flex; align-items: center; gap: 4px; }
.hero__brand-icon { display: inline-block; animation: spin 4s linear infinite; font-style: normal; }
@keyframes spin { to { transform: rotate(360deg); } }

.hero__sub { font-size: 1.05rem; color: var(--text-light); line-height: 1.7; margin-bottom: 28px; }
.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
.hero__stats { display: flex; align-items: center; gap: 24px; }
.stat { display: flex; flex-direction: column; }
.stat strong { font-size: 1.4rem; color: var(--pink-accent); font-weight: 700; }
.stat span   { font-size: 0.78rem; color: var(--text-light); }
.stat-divider { width: 1px; height: 36px; background: rgba(233,30,140,.2); }

/* ─── Hero cards ────────────────────────────────────────────── */
.hero__visual { position: relative; z-index: 2; flex-shrink: 0; }

.hero__card-stack {
  position: relative;
  width: 340px;   /* ← más ancho para ver las 3 */
  height: 380px;
}

.card-float {
  position: absolute;
  width: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 16px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s;
}
/* Separación más visible entre las 3 cards */
.card-float--back  {
  bottom: 0; left: 0;
  transform: rotate(-8deg) translateX(-10px);
  opacity: 0.75;
  animation: floatCard 5s ease-in-out 1s infinite;
}
.card-float--mid   {
  bottom: 50px; left: 75px;
  transform: rotate(0deg);
  opacity: 0.9;
  animation: floatCard 5s ease-in-out 0.5s infinite;
  z-index: 1;
}
.card-float--front {
  bottom: 100px; left: 150px;
  transform: rotate(8deg) translateX(10px);
  box-shadow: 0 20px 60px rgba(233,30,140,.28);
  z-index: 2;
  animation: floatCard 5s ease-in-out infinite;
}
@keyframes floatCard { 0%,100%{transform-origin:center; margin-top:0} 50%{margin-top:-10px} }

.card-float:hover {
  transform: rotate(0deg) translateY(-12px) scale(1.05) !important;
  box-shadow: 0 28px 60px rgba(233,30,140,.3);
  z-index: 10;
}

.card-img-wrap {
  width: 110px; height: 110px;
  border-radius: 14px; overflow: hidden;
  background: var(--pink-soft);
  display: flex; align-items: center; justify-content: center;
}
.card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 14px;
  transition: transform 0.3s;
}
.card-float:hover .card-img { transform: scale(1.08); }
.card-img-placeholder { font-size: 2.8rem; }
.card-float span { font-size: 0.8rem; color: var(--text-light); font-weight: 500; }

/* ─── Botones ────────────────────────────────────────────────── */
.btn-primary {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; border: none; padding: 14px 28px; border-radius: 50px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  text-decoration: none; display: inline-block;
  box-shadow: 0 8px 25px rgba(233,30,140,.3); transition: all 0.3s ease;
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(233,30,140,.4); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn-ghost {
  background: transparent; color: var(--pink-deep);
  border: 1.5px solid var(--pink-mid); padding: 14px 28px; border-radius: 50px;
  font-size: 0.95rem; cursor: pointer; text-decoration: none;
  display: inline-block; transition: all 0.2s;
}
.btn-ghost:hover { background: var(--pink-soft); border-color: var(--pink-accent); }
.btn-lg { padding: 16px 36px; font-size: 1rem; }
.btn-cta-rose {
  background: #fff; color: #c2185b; border: none; padding: 16px 40px; border-radius: 50px;
  font-size: 1rem; font-weight: 700; cursor: pointer; text-decoration: none;
  display: inline-block; box-shadow: 0 8px 32px rgba(0,0,0,.18);
  transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
}
.btn-cta-rose:hover { transform: translateY(-4px) scale(1.03); background: #fff0f5; }

/* ─── QUIÉNES SOMOS ─────────────────────────────────────────── */
.about__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 40px; }
.about__text p { color: var(--text-light); line-height: 1.8; margin-bottom: 16px; }
.about__text strong { color: var(--text); }
.about__values { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.value-pill {
  background: rgba(233,30,140,.08); border: 1px solid rgba(233,30,140,.15);
  color: var(--pink-deep); padding: 8px 18px; border-radius: 50px;
  font-size: 0.85rem; font-weight: 500;
}
.about__img-frame { position: relative; }
.about__img-placeholder {
  background: linear-gradient(135deg, var(--pink-soft), #fff); border-radius: 30px;
  aspect-ratio: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px;
  color: var(--text-light); border: 2px dashed rgba(233,30,140,.2); font-size: 0.9rem;
}
.big-emoji { font-size: 4rem; }
.about__img-deco {
  position: absolute; bottom: -20px; right: -20px;
  width: 100px; height: 100px;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border-radius: 20px; opacity: 0.2; z-index: -1;
}

/* ─── ORGANIGRAMA ───────────────────────────────────────────── */
.org__tree { display: flex; flex-direction: column; align-items: center; margin-top: 40px; }
.org__level { display: flex; justify-content: center; gap: 24px; }
.org__level--two { gap: 32px; }
.org__connector { width: 2px; height: 40px; background: linear-gradient(to bottom, var(--pink-mid), var(--pink-soft)); margin: 0 auto; }
.org__card {
  background: #fff; border: 1.5px solid rgba(233,30,140,.15); border-radius: 20px;
  padding: 24px; text-align: center; width: 180px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  box-shadow: 0 4px 20px rgba(233,30,140,.08); transition: transform 0.3s, box-shadow 0.3s;
}
.org__card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.org__card--main { background: linear-gradient(135deg, #fff0f5, #fce4ec); border-color: var(--pink-mid); width: 220px; }
.org__card--community { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); border-color: transparent; width: 260px; }
.org__card--community strong, .org__card--community span { color: #fff; }
.org__avatar { font-size: 2rem; }
.org__card strong { font-size: 0.95rem; color: var(--text); }
.org__card span   { font-size: 0.78rem; color: var(--text-light); line-height: 1.4; }

/* ─── REDES SOCIALES ────────────────────────────────────────── */
.social__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; }
.social__card {
  background: #fff; border-radius: 20px; padding: 24px;
  display: flex; align-items: center; gap: 16px; text-decoration: none; color: var(--text);
  box-shadow: 0 4px 20px rgba(0,0,0,.05); border: 1px solid rgba(233,30,140,.1);
  transition: all 0.3s;
}
.social__card:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
.social__icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0; }
.social__info { flex: 1; }
.social__info strong { display: block; font-size: 0.95rem; color: var(--text); }
.social__info span   { display: block; font-size: 0.8rem; color: var(--pink-accent); margin-bottom: 4px; }
.social__info p      { font-size: 0.8rem; color: var(--text-light); margin: 0; }
.social__arrow { font-size: 1.2rem; color: var(--pink-mid); transition: transform 0.2s; }
.social__card:hover .social__arrow { transform: translateX(4px); }

/* ─── TESTIMONIOS ───────────────────────────────────────────── */
.testimonials__wrap { position: relative; display: flex; align-items: center; gap: 12px; margin-top: 40px; }
.testimonials__track { flex: 1; overflow: hidden; }
.testimonials__inner { display: flex; gap: 20px; transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
.testimonials__nav {
  flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
  border: 2px solid rgba(233,30,140,.2); background: #fff; color: var(--pink-accent);
  font-size: 1.6rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; box-shadow: 0 4px 12px rgba(233,30,140,.1); z-index: 2; line-height: 1;
}
.testimonials__nav:hover { background: var(--pink-accent); color: #fff; border-color: var(--pink-accent); }
.testimonial__card {
  flex: 0 0 300px; background: #fff; border-radius: 24px; padding: 28px;
  border: 1.5px solid rgba(233,30,140,.1); box-shadow: 0 4px 20px rgba(233,30,140,.06);
  transition: box-shadow 0.3s, transform 0.3s;
}
.testimonial__card.active { border-color: var(--pink-mid); box-shadow: 0 8px 32px rgba(233,30,140,.18); }
.testimonial__img-wrap { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 16px; border: 3px solid var(--pink-soft); }
.testimonial__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.testimonial__img--placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--pink-soft), #fce4ec); display: flex; align-items: center; justify-content: center; font-size: 2rem; }
.testimonial__header { display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 14px; }
.testimonial__header strong { display: block; font-size: 0.95rem; color: var(--text); text-align: center; }
.testimonial__header span   { font-size: 0.8rem; color: var(--text-light); text-align: center; display: block; }
.testimonial__card p { font-size: 0.9rem; color: var(--text-light); line-height: 1.6; margin-bottom: 12px; font-style: italic; text-align: center; }
.testimonial__stars { font-size: 1rem; margin-bottom: 8px; text-align: center; }
.testimonial__tag { display: inline-block; background: var(--pink-soft); color: var(--pink-deep); padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; text-align: center; width: 100%; }
.testimonials__dots { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pink-soft); border: none; cursor: pointer; transition: all 0.3s; }
.dot.active { background: var(--pink-accent); width: 24px; border-radius: 4px; }

/* ─── ADMIN PANEL TESTIMONIOS ───────────────────────────────── */
.admin__panel {
  margin-top: 48px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border: 1.5px solid rgba(233,30,140,.2);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(233,30,140,.08);
}
.admin__panel-header {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(233,30,140,.15);
}
.admin__panel-header span { font-size: 1.6rem; }
.admin__panel-header h3 {
  font-size: 1.15rem; color: var(--text); margin: 0;
  font-family: 'Playfair Display', serif;
}

.admin__form { display: flex; flex-direction: column; gap: 14px; }
.admin__form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.admin__input {
  padding: 12px 16px; border-radius: 14px;
  border: 1.5px solid rgba(233,30,140,.2);
  font-size: 0.9rem; color: var(--text);
  outline: none; background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%; box-sizing: border-box;
  font-family: 'DM Sans', sans-serif;
}
.admin__input:focus {
  border-color: var(--pink-accent);
  box-shadow: 0 0 0 3px rgba(233,30,140,.08);
}
.admin__input::placeholder { color: #bbb; }

.admin__textarea {
  padding: 12px 16px; border-radius: 14px;
  border: 1.5px solid rgba(233,30,140,.2);
  font-size: 0.9rem; color: var(--text);
  outline: none; background: #fff;
  resize: vertical; min-height: 100px;
  width: 100%; box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: 'DM Sans', sans-serif;
  line-height: 1.6;
}
.admin__textarea:focus {
  border-color: var(--pink-accent);
  box-shadow: 0 0 0 3px rgba(233,30,140,.08);
}
.admin__textarea::placeholder { color: #bbb; }

/* Upload foto */
.admin__upload {
  position: relative;
  border: 2px dashed rgba(233,30,140,.25);
  border-radius: 16px; min-height: 100px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; background: #fff;
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
}
.admin__upload:hover {
  border-color: var(--pink-accent);
  background: rgba(233,30,140,.03);
}
.admin__upload.has-foto {
  border-style: solid; border-color: var(--pink-mid);
}
.admin__upload-placeholder {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  color: var(--text-light); font-size: 0.85rem; padding: 20px; text-align: center;
}
.admin__upload-placeholder span { font-size: 1.8rem; }
.admin__upload-placeholder p { margin: 0; font-weight: 500; }
.admin__upload-preview {
  width: 100%; max-height: 180px; object-fit: cover; border-radius: 14px; display: block;
}
.admin__upload-remove {
  position: absolute; top: 8px; right: 8px;
  background: rgba(0,0,0,.5); color: #fff;
  border: none; width: 28px; height: 28px; border-radius: 50%;
  cursor: pointer; font-size: 0.8rem;
  display: flex; align-items: center; justify-content: center;
}

.admin__form-footer {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  margin-top: 4px;
}
.char-count { font-size: 0.78rem; color: var(--text-light); }

/* Lista testimonios admin */
.admin__testimonios-lista {
  margin-top: 28px;
  border-top: 1.5px solid rgba(233,30,140,.15);
  padding-top: 22px;
}
.admin__lista-titulo {
  font-size: 0.78rem; font-weight: 700; color: var(--text-light);
  text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px;
}
.admin__testimonio-item {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 14px; border-radius: 16px; background: #fff;
  border: 1.5px solid rgba(233,30,140,.1); margin-bottom: 10px;
  transition: all 0.2s; box-shadow: 0 2px 8px rgba(233,30,140,.05);
}
.admin__testimonio-item:hover {
  border-color: rgba(233,30,140,.3);
  box-shadow: 0 4px 16px rgba(233,30,140,.1);
}
.admin__testimonio-info { display: flex; gap: 12px; flex: 1; }
.admin__testimonio-avatar {
  width: 48px;
  height: 48px;
  min-width: 48px;      
  min-height: 48px;     
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--pink-soft), #fce4ec);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border: 2px solid rgba(233,30,140,.15);
}
.admin__testimonio-avatar img { width: 100%; height: 100%; object-fit: cover; }
.admin__testimonio-info > div:not(.admin__testimonio-avatar) {
flex: auto;
}
.admin__testimonio-info strong {
  display: block; font-size: 0.9rem; color: var(--text); margin-bottom: 2px;
}
.admin__testimonio-info span {
  font-size: 0.75rem; color: var(--pink-accent); display: block; margin-bottom: 5px;
}
.admin__testimonio-info p {
  font-size: 0.82rem; color: var(--text-light); margin: 0; line-height: 1.5;
  font-style: italic;
}
.admin__testimonio-delete {
  background: none; border: 1.5px solid rgba(239,68,68,.2); color: #ef4444;
  width: 34px; height: 34px; border-radius: 10px; cursor: pointer; flex-shrink: 0;
  font-size: 0.9rem; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.admin__testimonio-delete:hover {
  background: rgba(239,68,68,.08); border-color: #ef4444;
  transform: scale(1.05);
}

/* ─── TESTIMONIOS VACÍO ─────────────────────────────────────── */
.testimonials__empty {
  margin-top: 40px;
  text-align: center; padding: 60px 20px;
  background: rgba(233,30,140,.03);
  border: 2px dashed rgba(233,30,140,.15);
  border-radius: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.testimonials__empty span { font-size: 3rem; }
.testimonials__empty p { font-size: 0.95rem; color: var(--text-light); margin: 0; }

/* ─── SECCIÓN COMENTARIOS — CLIENTE ────────────────────────── */
.comment__form {
  background: #fff; border-radius: 24px; padding: 32px;
  border: 1.5px solid rgba(233,30,140,.15);
  box-shadow: 0 8px 32px rgba(233,30,140,.07);
}
.comment__form h3 {
  font-size: 1.3rem; color: var(--text); margin-bottom: 8px;
  font-family: 'Playfair Display', serif;
}
.comment__form-desc {
  font-size: 0.9rem; color: var(--text-light);
  margin-bottom: 20px; line-height: 1.7;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(233,30,140,.1);
}
.comment__form-inner { display: flex; flex-direction: column; gap: 14px; }
.comment__form textarea {
  width: 100%; min-height: 120px;
  padding: 16px; border-radius: 16px;
  border: 1.5px solid rgba(233,30,140,.2);
  font-size: 0.92rem; color: var(--text); resize: vertical;
  outline: none; box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: 'DM Sans', sans-serif; line-height: 1.6;
  background: #fff;
}
.comment__form textarea:focus {
  border-color: var(--pink-accent);
  box-shadow: 0 0 0 3px rgba(233,30,140,.08);
}
.comment__form textarea::placeholder { color: #bbb; }
.comment__form-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
}
.comment__success {
  background: rgba(34,197,94,.08); border: 1.5px solid rgba(34,197,94,.25);
  color: #15803d; padding: 14px 18px; border-radius: 14px;
  font-size: 0.88rem; text-align: center;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}

/* ─── COMENTARIOS — USUARIO NO REGISTRADO ───────────────────── */
.comment__login-prompt {
  margin-top: 8px;
  display: flex; align-items: center; gap: 16px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border: 1.5px solid rgba(233,30,140,.15);
  border-radius: 20px; padding: 24px 28px;
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
}
.comment__login-prompt span { font-size: 2rem; flex-shrink: 0; }
.comment__login-prompt p {
  margin: 0; font-size: 0.95rem; color: var(--text-light); line-height: 1.6;
}
.link-pink {
  color: var(--pink-accent); text-decoration: none; font-weight: 700;
  border-bottom: 1.5px solid rgba(233,30,140,.3);
  transition: border-color 0.2s;
}
.link-pink:hover { border-color: var(--pink-accent); }

/* ─── COMENTARIOS — PANEL ADMIN ─────────────────────────────── */
.comment__admin {
  background: #fff; border-radius: 24px; padding: 32px;
  border: 1.5px solid rgba(233,30,140,.15);
  box-shadow: 0 8px 32px rgba(233,30,140,.07);
}
.comment__admin-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; flex-wrap: wrap; gap: 10px;
  padding-bottom: 16px; border-bottom: 1px solid rgba(233,30,140,.1);
}
.comment__admin-header > div { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.comment__admin-header h3 {
  font-size: 1.15rem; color: var(--text); margin: 0;
  font-family: 'Playfair Display', serif;
}
.comment__admin-badge {
  display: inline-flex; align-items: center;
  background: var(--pink-accent); color: #fff;
  font-size: 0.72rem; font-weight: 700; padding: 4px 12px;
  border-radius: 50px;
}
.comment__admin-empty {
  text-align: center; padding: 50px 20px; color: var(--text-light);
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  background: rgba(233,30,140,.03); border-radius: 16px;
  border: 2px dashed rgba(233,30,140,.12);
}
.comment__admin-empty span { font-size: 3rem; opacity: 0.4; }
.comment__admin-empty p { font-size: 0.9rem; margin: 0; }
.comment__admin-list { display: flex; flex-direction: column; gap: 12px; }

.comment__admin-item {
  background: #fafafa; border: 1.5px solid rgba(233,30,140,.08);
  border-radius: 18px; padding: 18px 20px;
  transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.comment__admin-item:hover {
  border-color: rgba(233,30,140,.2);
  box-shadow: 0 4px 16px rgba(233,30,140,.08);
}
.comment__admin-item--nuevo {
  background: rgba(233,30,140,.04);
  border-color: rgba(233,30,140,.2);
}
.comment__admin-item-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 12px; flex-wrap: wrap;
}
.comment__admin-avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;      
  min-height: 40px;     
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; font-weight: 700; font-size: 1rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(233,30,140,.25);
}
.comment__admin-item-header > div:not(.comment__admin-avatar) {
  flex: auto; 
}
.comment__admin-item-header strong { font-size: 0.92rem; color: var(--text); display: block; }
.comment__admin-email { font-size: 0.75rem; color: var(--text-light); display: block; }
.comment__admin-fecha {
  font-size: 0.75rem; color: var(--text-light); margin-left: auto;
  background: rgba(233,30,140,.06); padding: 3px 10px; border-radius: 50px;
}
.comment__admin-new-badge {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #fff; font-size: 0.7rem; font-weight: 700;
  padding: 3px 10px; border-radius: 50px;
}
.comment__admin-texto {
  font-size: 0.9rem; color: var(--text); line-height: 1.65;
  margin: 0 0 12px; padding: 12px 14px;
  background: #fff; border-radius: 12px;
  border-left: 3px solid rgba(233,30,140,.2);
}
.btn-marcar-leido {
  background: none; border: 1.5px solid rgba(34,197,94,.3); color: #15803d;
  font-size: 0.78rem; font-weight: 600; padding: 7px 16px; border-radius: 50px;
  cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  display: inline-flex; align-items: center; gap: 5px;
}
.btn-marcar-leido:hover {
  background: rgba(34,197,94,.08); border-color: #15803d;
  transform: translateY(-1px);
}
.btn-ghost-sm {
  background: transparent; border: 1.5px solid var(--pink-mid); color: var(--pink-deep);
  padding: 8px 18px; border-radius: 50px; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
}
.btn-ghost-sm:hover { background: var(--pink-soft); border-color: var(--pink-accent); }

/* ─── Responsive comentarios/admin ──────────────────────────── */
@media (max-width: 640px) {
  .admin__form-row { grid-template-columns: 1fr; }
  .comment__login-prompt { flex-direction: column; text-align: center; }
  .comment__admin-fecha { display: none; }
  .admin__panel { padding: 20px; }
  .comment__form { padding: 20px; }
  .comment__admin { padding: 20px; }
}

/* ─── ENTREGAS / MAPA ────────────────────────────────────────── */
.delivery__grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: center; margin-top: 40px; }
.delivery__item { display: flex; gap: 16px; align-items: flex-start; padding: 20px; border-radius: 16px; background: rgba(255,255,255,.75); border: 1px solid rgba(233,30,140,.12); margin-bottom: 12px; box-shadow: 0 4px 16px rgba(233,30,140,.06); backdrop-filter: blur(4px); }
.delivery__icon { font-size: 2rem; flex-shrink: 0; }
.delivery__item strong { display: block; color: var(--text); font-size: 0.95rem; margin-bottom: 4px; }
.delivery__item span   { font-size: 0.85rem; color: var(--text-light); }
.delivery__map { display: flex; flex-direction: column; gap: 12px; }
.map__wrapper { height: 380px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(233,30,140,.15); }
.map__note { text-align: center; color: var(--text-light); font-size: 0.85rem; }

/* ─── CTA ────────────────────────────────────────────────────── */
.cta__inner { display: flex; flex-direction: column; align-items: center; gap: 20px; position: relative; z-index: 1; }
.cta__inner h2 { font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin: 0; text-shadow: 0 2px 12px rgba(0,0,0,.1); }
.cta__inner p  { color: rgba(255,255,255,.95); font-size: 1.1rem; max-width: 500px; text-align: center; margin: 0; }
.big-emoji-cta { font-size: 4rem; animation: bounce 2s ease-in-out infinite; display: block; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }

/* ─── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero { flex-direction: column; text-align: center; padding-top: 100px; justify-content: center; }
  .hero__ctas { justify-content: center; }
  .hero__stats { justify-content: center; }
  .hero__visual { display: flex; justify-content: center; }
  .hero__card-stack { width: 280px; height: 300px; }
  .card-float { width: 160px; }
  .card-float--back  { left: 0; bottom: 0; }
  .card-float--mid   { left: 60px; bottom: 40px; }
  .card-float--front { left: 120px; bottom: 80px; }
  .about__grid { grid-template-columns: 1fr; }
  .delivery__grid { grid-template-columns: 1fr; }
  .org__level--two { flex-direction: column; align-items: center; }
  .admin__form-row { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .testimonials__nav { display: none; }
  /* Testimonios — card más compacta en mobile */
  .testimonials__wrap { gap: 6px; margin-top: 24px; }
  .testimonials__track { overflow: hidden; }
  .testimonials__inner {
    transition: transform 0.3s ease;
  }
  .testimonial__card {
    flex: 0 0 calc(100vw - 48px); /* ocupa casi todo el ancho */
    padding: 20px;
    min-width: 0;
  }
  .testimonial__img-wrap { width: 64px; height: 64px; }
  .testimonial__header strong { font-size: 0.88rem; }
  .testimonial__card p { font-size: 0.85rem; }
  .testimonials__nav { display: none; }
  .testimonials__dots { margin-top: 14px; }

  /* Admin panel testimonios en mobile */
  .admin__panel { padding: 18px 14px; margin-top: 28px; }
  .admin__form-row { grid-template-columns: 1fr; }
  .admin__panel-header h3 { font-size: 1rem; }

  /* Sección comentarios */
  .section--review { padding: 32px 16px 48px; }
  .comment__form { padding: 20px 16px; }
  .comment__admin { padding: 20px 16px; }
  .comment__login-prompt { padding: 18px 16px; flex-direction: column; text-align: center; }
  .comment__admin-fecha { display: none; }
  .comment__admin-item-header { flex-wrap: wrap; gap: 8px; }

  /* Hero stats */
  .hero__stats { gap: 16px; }
  .stat strong { font-size: 1.1rem; }

  /* Sección entregas */
  .map__wrapper { height: 250px; }
  .delivery__item { padding: 14px; }

  /* CTA */
  .cta__inner h2 { font-size: 1.6rem; }
  .cta__inner p  { font-size: 0.92rem; }
  .btn-cta-rose  { padding: 14px 28px; font-size: 0.9rem; }
}

/* ─── Sección review — ancho máximo correcto ─────────────────── */
.section--review .section__inner {
  max-width: 800px;
}

/* ─── Comment form — box-sizing fix ─────────────────────────── */
.comment__form textarea,
.admin__input,
.admin__textarea {
  box-sizing: border-box;
}

</style>