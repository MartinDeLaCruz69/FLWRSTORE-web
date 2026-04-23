<template>
  <div class="stock-page">

    <!-- ══ HERO ══ -->
    <section class="stock-hero">
      <div class="stock-hero__bg">
        <div class="sh-blob sh-blob--1"></div>
        <div class="sh-blob sh-blob--2"></div>
        <div class="sh-blob sh-blob--3"></div>
      </div>
      <div class="stock-hero__content">
        <span class="page-tag">🛍️ Catálogo</span>
        <h1>Stock <span class="text-pink">Disponible</span></h1>
        <p>Aparta lo que más te guste antes de que se agote. Actualizado en tiempo real 🌸</p>
        <!-- Stats rápidos -->
        <div class="stock-hero__stats">
          <div class="sh-stat">
            <strong>{{ productos.filter(p => p.estado === 'disponible').length }}</strong>
            <span>Disponibles</span>
          </div>
          <div class="sh-stat-div"></div>
          <div class="sh-stat">
            <strong>{{ productos.filter(p => p.estado === 'apartado').length }}</strong>
            <span>Apartados</span>
          </div>
          <div class="sh-stat-div"></div>
          <div class="sh-stat">
            <strong>{{ categorias.length }}</strong>
            <span>Categorías</span>
          </div>
        </div>
        <!-- Después de .stock-hero__stats y antes de los filtros -->
        <div v-if="cargando" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Cargando stock en tiempo real... 🌸</p>
        </div>
      </div>
    </section>

    <!-- ══ FILTROS ══ -->
    <div class="filters-bar">
      <div class="filters-bar__inner">

        <!-- Búsqueda -->
        <div class="search-box">
          <span class="search-box__icon">🔍</span>
          <input v-model="busqueda" type="text" placeholder="Buscar producto, grupo..." />
          <button v-if="busqueda" class="search-box__clear" @click="busqueda = ''">✕</button>
        </div>

        <!-- Categorías -->
        <div class="cat-pills">
          <button
            v-for="cat in ['Todos', ...categorias]" :key="cat"
            class="cat-pill"
            :class="{ active: categoriaActiva === cat }"
            @click="categoriaActiva = cat"
          >
            {{ catEmoji[cat] || '🌸' }} {{ cat }}
          </button>
        </div>

        <!-- Filtro de estado -->
        <div class="estado-filter">
          <button
            v-for="est in estados" :key="est.val"
            class="estado-btn"
            :class="{ active: estadoFiltro === est.val }"
            @click="estadoFiltro = estadoFiltro === est.val ? 'todos' : est.val"
          >
            <span :class="'dot dot--' + est.val"></span>
            {{ est.label }}
          </button>
        </div>

      </div>
    </div>

    <!-- ══ GRID DE PRODUCTOS ══ -->
    <div class="stock-main">
      <div class="stock-main__inner">

        <!-- Sin resultados -->
        <div v-if="productosFiltrados.length === 0" class="empty-state">
          <span>🌸</span>
          <h3>No encontramos productos</h3>
          <p>Prueba con otra categoría o búsqueda</p>
          <button class="btn-ghost-sm" @click="resetFiltros">Limpiar filtros</button>
        </div>

        <!-- Grid -->
        <TransitionGroup name="grid" tag="div" class="products-grid">
          <div
            v-for="(prod, i) in productosFiltrados"
            :key="prod.id"
            class="product-card"
            :class="['product-card--' + prod.estado, { 'product-card--new': prod.condicion === 'nuevo' }]"
            :style="{ '--i': i }"
            @click="abrirModal(prod)"
          >
            <!-- Badges superiores -->
            <div class="product-card__badges">
              <span class="badge badge--estado" :class="'badge--' + prod.estado">
                {{ estadoLabel[prod.estado] }}
              </span>
              <span v-if="prod.condicion === 'nuevo'" class="badge badge--new">✨ Nuevo</span>
              <span v-if="prod.condicion === 'segunda'" class="badge badge--segunda">📦 2da mano</span>
            </div>

            <!-- Imagen / placeholder -->
            <div class="product-card__img">
              <div class="product-card__img-inner">
                <img v-if="prod.imagenUrl" :src="prod.imagenUrl"
                    :alt="prod.nombre" class="product-card__photo" />
                <span v-else class="product-card__emoji">
                  {{ catEmoji[prod.categoria] || '🎵' }}
                </span>
              <div class="product-card__overlay">
                <span class="overlay-icon">👁️</span>
                <span class="overlay-text">Ver detalle</span>
              </div>
            </div>
              <!-- Shimmer si apartado/vendido -->
              <div v-if="prod.estado !== 'disponible'" class="product-card__veil">
                <span v-if="prod.estado === 'apartado'">⏳ Apartado</span>
                <span v-if="prod.estado === 'vendido'">✅ Vendido</span>
              </div>
            </div>

            <!-- Info -->
            <div class="product-card__info">
              <div class="product-card__cat">{{ prod.categoria }}</div>
              <h3 class="product-card__name">{{ prod.nombre }}</h3>
              <div class="product-card__grupo">{{ prod.grupo }}</div>

              <div class="product-card__footer">
                <span class="product-card__price">${{ prod.precio.toLocaleString() }} MXN</span>
                <button
                  v-if="prod.estado === 'disponible'"
                  class="btn-apartar"
                  @click.stop="abrirApartar(prod)"
                >
                  Apartar 🌸
                </button>
                <span v-else-if="prod.estado === 'apartado'" class="footer-tag footer-tag--apartado">
                  Apartado por {{ prod.apartadoPor }}
                </span>
                <span v-else class="footer-tag footer-tag--vendido">Vendido 💖</span>
              </div>
            </div>
          </div>
        </TransitionGroup>

      </div>
    </div>

    <!-- ══ MODAL DETALLE ══ -->
    <Transition name="modal">
      <div v-if="modalProd" class="modal-backdrop" @click.self="modalProd = null">
        <div class="modal-card">
          <button class="modal-close" @click="modalProd = null">✕</button>

          <div class="modal-card__img">
            <img v-if="modalProd.imagenUrl" :src="modalProd.imagenUrl"
              :alt="modalProd.nombre" class="modal-photo" />
            <span v-else>{{ catEmoji[modalProd.categoria] || '🎵' }}</span>
            <span class="badge badge--estado" :class="'badge--' + modalProd.estado">
              {{ estadoLabel[modalProd.estado] }}
            </span>
          </div>

          <div class="modal-card__body">
            <div class="modal-card__cat">{{ modalProd.categoria }}</div>
            <h2>{{ modalProd.nombre }}</h2>
            <div class="modal-card__grupo">🎤 {{ modalProd.grupo }}</div>

            <div class="modal-detail-grid">
              <div class="modal-detail-item">
                <span class="mdi-label">💰 Precio</span>
                <strong>${{ modalProd.precio.toLocaleString() }} MXN</strong>
              </div>
              <div class="modal-detail-item">
                <span class="mdi-label">📦 Condición</span>
                <strong>{{ modalProd.condicion === 'nuevo' ? '✨ Nuevo (sellado)' : '📦 2da mano (buen estado)' }}</strong>
              </div>
              <div class="modal-detail-item">
                <span class="mdi-label">📋 Estado</span>
                <strong>{{ estadoLabel[modalProd.estado] }}</strong>
              </div>
              <div class="modal-detail-item" v-if="modalProd.apartadoPor">
                <span class="mdi-label">👤 Apartado por</span>
                <strong>{{ modalProd.apartadoPor }}</strong>
              </div>
            </div>

            <!-- Inclusiones -->
            <div v-if="modalProd.inclusiones?.length" class="modal-inclusiones">
              <span class="mdi-label">🎁 Inclusiones</span>
              <div class="inclusion-tags">
                <span v-for="inc in modalProd.inclusiones" :key="inc" class="inclusion-tag">{{ inc }}</span>
              </div>
            </div>

            <!-- Acciones -->
            <div class="modal-actions"> 
              <!-- Acciones admin dentro del modal -->
              <div v-if="esAdmin" class="modal-admin-actions">
                <button class="btn-admin-action btn-edit"
                        @click="abrirEditar(modalProd); modalProd = null">
                  ✏️ Editar
                </button>
                <button v-if="modalProd.estado === 'apartado'"
                        class="btn-admin-action btn-liberar"
                        @click="accionRapida('liberar', modalProd)">
                  🔓 Liberar
                </button>
                <button v-if="modalProd.estado !== 'vendido'"
                        class="btn-admin-action btn-vendido"
                        @click="accionRapida('vendido', modalProd)">
                  ✅ Marcar vendido
                </button>
                <button class="btn-admin-action btn-delete"
                        @click="confirmarEliminar(modalProd)">
                  🗑️ Eliminar
                </button>
              </div>
              <button
                v-if="modalProd.estado === 'disponible'"
                class="btn-apartar btn-apartar--lg"
                @click="abrirApartar(modalProd)"
              >
                🌸 Quiero apartar este producto
              </button>
              <div v-else-if="modalProd.estado === 'apartado'" class="modal-apartado-msg">
                <span>⏳</span>
                <p>Este producto ya fue apartado. Si el pago no se completa en 24h, regresará a stock.</p>
              </div>
              <div v-else class="modal-vendido-msg">
                <span>💖</span>
                <p>Este producto ya fue vendido. ¡Sigue al pendiente del stock!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ MODAL APARTAR ══ -->
    <Transition name="modal">
      <div v-if="apartarProd" class="modal-backdrop" @click.self="apartarProd = null">
        <div class="modal-card modal-card--apartar">
          <button class="modal-close" @click="apartarProd = null">✕</button>
          <div class="apartar-header">
            <span>{{ catEmoji[apartarProd.categoria] || '🌸' }}</span>
            <div>
              <h3>Apartar producto</h3>
              <p>{{ apartarProd.nombre }} · {{ apartarProd.grupo }}</p>
            </div>
          </div>

          <div class="apartar-info">
            <div class="apartar-info__item">⏱️ Tienes <strong>24 horas</strong> para completar el pago.</div>
            <div class="apartar-info__item">💬 El pago se coordina por <strong>WhatsApp oficial</strong>.</div>
            <div v-if="apartarProd.precio >= 550" class="apartar-info__item apartar-info__item--highlight">
              💰 Puedes dar un anticipo del <strong>20%</strong> (${{ Math.ceil(apartarProd.precio * 0.2).toLocaleString() }} MXN) para facilidades de pago.
            </div>
          </div>

          <div class="apartar-form">
            <label>Tu nombre completo</label>
            <input v-model="nombreCliente" type="text" placeholder="Ej: Valeria Rodríguez" />
            <div v-if="errorNombre" class="form-error">{{ errorNombre }}</div>
          </div>

          <div class="apartar-actions">
            <button class="btn-ghost-sm" @click="apartarProd = null">Cancelar</button>
            <button class="btn-apartar btn-apartar--lg" @click="confirmarApartado">
              Confirmar apartado 🌸
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ TOAST ══ -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="'toast--' + toast.type">
        {{ toast.msg }}
      </div>
    </Transition>

    <!-- ══ PANEL ADMIN ══ -->
    <Transition name="slide-up">
      <div v-if="esAdmin && adminPanelOpen" class="admin-panel">
        <div class="admin-panel__header">
          <div class="admin-panel__tabs">
            <button :class="{ active: adminTab === 'agregar' }" @click="adminTab = 'agregar'">
              ➕ Agregar
            </button>
            <button :class="{ active: adminTab === 'editar' }" @click="adminTab = 'editar'"
                    :disabled="!prodEditando">
              ✏️ Editar {{ prodEditando ? `— ${prodEditando.nombre}` : '' }}
            </button>
          </div>
          <button class="admin-panel__close" @click="adminPanelOpen = false">✕</button>
        </div>

        <div class="admin-panel__body">

          <!-- ── TAB AGREGAR ── -->
          <div v-if="adminTab === 'agregar'">
            <div class="admin-form">
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Nombre del producto *</label>
                  <input v-model="formNuevo.nombre" placeholder="Ej: Ready to Be" />
                </div>
                <div class="admin-field">
                  <label>Grupo *</label>
                  <input v-model="formNuevo.grupo" placeholder="Ej: TWICE" />
                </div>
              </div>
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Categoría</label>
                  <select v-model="formNuevo.categoria">
                    <option v-for="cat in categorias" :key="cat" :value="cat">
                      {{ catEmoji[cat] }} {{ cat }}
                    </option>
                  </select>
                </div>
                <div class="admin-field">
                  <label>Precio (MXN) *</label>
                  <input v-model.number="formNuevo.precio" type="number" placeholder="350" />
                </div>
              </div>
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Condición</label>
                  <select v-model="formNuevo.condicion">
                    <option value="nuevo">✨ Nuevo (sellado)</option>
                    <option value="segunda">📦 Segunda mano</option>
                  </select>
                </div>
                <div class="admin-field">
                  <label>Estado inicial</label>
                  <select v-model="formNuevo.estado">
                    <option value="disponible">🟢 Disponible</option>
                    <option value="apartado">🟡 Apartado</option>
                    <option value="vendido">🔴 Vendido</option>
                  </select>
                </div>
              </div>
              <div class="admin-field admin-field--full">
                <label>Inclusiones (separadas por coma)</label>
                <input v-model="formNuevo.inclusiones" placeholder="Photobook, Photocard, Póster" />
              </div>

              <!-- Foto -->
              <div class="admin-field admin-field--full">
                <label>Foto del producto *</label>
                <div v-if="imagenPreviewNuevo" class="img-preview">
                  <img :src="imagenPreviewNuevo" alt="preview" />
                  <button type="button" class="img-preview__remove" @click="limpiarImagenNuevo">✕</button>
                </div>
                <label v-else class="file-drop" for="fileNuevo">
                  <span>📸</span>
                  <p>Haz clic para subir una foto</p>
                  <small>JPG, PNG o WEBP · Máx 5MB</small>
                </label>
                <input id="fileNuevo" type="file" accept="image/*"
                      style="display:none" @change="onImageNuevo" />
              </div>

              <!-- Progreso de subida -->
              <div v-if="guardando" class="upload-progress">
                <div class="upload-progress__bar" :style="{ width: uploadProgress + '%' }"></div>
                <span>{{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Guardando...' }}</span>
              </div>

              <div class="admin-form__actions">
                <button class="btn-admin-cancel" @click="limpiarFormNuevo" :disabled="guardando">
                  Limpiar
                </button>
                <button class="btn-admin-add" @click="submitNuevo" :disabled="guardando">
                  <span v-if="!guardando">+ Agregar al stock</span>
                  <span v-else>Guardando... 🌸</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ── TAB EDITAR ── -->
          <div v-if="adminTab === 'editar' && prodEditando">
            <div class="admin-form">
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Nombre del producto</label>
                  <input v-model="formEditar.nombre" />
                </div>
                <div class="admin-field">
                  <label>Grupo</label>
                  <input v-model="formEditar.grupo" />
                </div>
              </div>
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Categoría</label>
                  <select v-model="formEditar.categoria">
                    <option v-for="cat in categorias" :key="cat" :value="cat">
                      {{ catEmoji[cat] }} {{ cat }}
                    </option>
                  </select>
                </div>
                <div class="admin-field">
                  <label>Precio (MXN)</label>
                  <input v-model.number="formEditar.precio" type="number" />
                </div>
              </div>
              <div class="admin-form__row">
                <div class="admin-field">
                  <label>Condición</label>
                  <select v-model="formEditar.condicion">
                    <option value="nuevo">✨ Nuevo (sellado)</option>
                    <option value="segunda">📦 Segunda mano</option>
                  </select>
                </div>
                <div class="admin-field">
                  <label>Estado</label>
                  <select v-model="formEditar.estado">
                    <option value="disponible">🟢 Disponible</option>
                    <option value="apartado">🟡 Apartado</option>
                    <option value="vendido">🔴 Vendido</option>
                  </select>
                </div>
              </div>
              <div class="admin-field admin-field--full">
                <label>Inclusiones</label>
                <input v-model="formEditar.inclusiones" />
              </div>

              <!-- Foto editar -->
              <div class="admin-field admin-field--full">
                <label>Foto del producto</label>
                <div v-if="imagenPreviewEditar" class="img-preview">
                  <img :src="imagenPreviewEditar" alt="preview" />
                  <label for="fileEditar" class="img-preview__change">Cambiar foto</label>
                </div>
                <label v-else class="file-drop" for="fileEditar">
                  <span>📸</span><p>Subir nueva foto</p>
                </label>
                <input id="fileEditar" type="file" accept="image/*"
                      style="display:none" @change="onImageEditar" />
              </div>

              <div v-if="guardando" class="upload-progress">
                <div class="upload-progress__bar" :style="{ width: uploadProgress + '%' }"></div>
                <span>{{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Guardando...' }}</span>
              </div>

              <div class="admin-form__actions">
                <button class="btn-admin-cancel"
                        @click="adminTab = 'agregar'; prodEditando = null">
                  Cancelar
                </button>
                <button class="btn-admin-add" @click="submitEditar" :disabled="guardando">
                  <span v-if="!guardando">💾 Guardar cambios</span>
                  <span v-else>Guardando... 🌸</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    <!-- FAB Admin -->
    <button v-if="esAdmin" class="fab-admin" @click="adminPanelOpen = !adminPanelOpen" :title="adminPanelOpen ? 'Cerrar panel' : 'Panel admin'">
      {{ adminPanelOpen ? '✕' : '🛠️' }}
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { rolActual } from '../composables/useAuth'
import { useProductos } from '../composables/useProductos'

// ── Rol ──────────────────────────────────────────────────────
const esAdmin = computed(() =>
  rolActual.value === 'admin' || rolActual.value === 'subadmin'
)

// ── Firestore ────────────────────────────────────────────────
const {
  productos, cargando,
  agregarProducto, editarProducto, eliminarProducto,
  apartarProducto, liberarProducto, marcarVendido,
} = useProductos()

// ── Catálogos ────────────────────────────────────────────────
const categorias = ['Álbumes', 'Photocards', 'Peluches', 'Lightsticks', 'Revistas']

const catEmoji = {
  'Todos': '🌸', 'Álbumes': '🎵', 'Photocards': '📸',
  'Peluches': '🧸', 'Lightsticks': '✨', 'Revistas': '📖',
}

const estadoLabel = {
  disponible: '🟢 Disponible',
  apartado:   '🟡 Apartado',
  vendido:    '🔴 Vendido',
}

const estados = [
  { val: 'disponible', label: 'Disponibles' },
  { val: 'apartado',   label: 'Apartados'   },
  { val: 'vendido',    label: 'Vendidos'     },
]

// ── Filtros ──────────────────────────────────────────────────
const busqueda        = ref('')
const categoriaActiva = ref('Todos')
const estadoFiltro    = ref('todos')

const productosFiltrados = computed(() =>
  productos.value.filter(p => {
    const matchCat    = categoriaActiva.value === 'Todos' || p.categoria === categoriaActiva.value
    const matchEst    = estadoFiltro.value === 'todos'    || p.estado    === estadoFiltro.value
    const matchSearch = !busqueda.value ||
      p.nombre?.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      p.grupo?.toLowerCase().includes(busqueda.value.toLowerCase())
    return matchCat && matchEst && matchSearch
  })
)

const resetFiltros = () => {
  busqueda.value = ''; categoriaActiva.value = 'Todos'; estadoFiltro.value = 'todos'
}

// ── Modal detalle ────────────────────────────────────────────
const modalProd  = ref(null)
const abrirModal = (prod) => { modalProd.value = prod }

// ── Modal apartar ────────────────────────────────────────────
const apartarProd   = ref(null)
const nombreCliente = ref('')
const errorNombre   = ref('')

const abrirApartar = (prod) => {
  apartarProd.value   = prod
  modalProd.value     = null
  nombreCliente.value = ''
  errorNombre.value   = ''
}

const confirmarApartado = async () => {
  if (!nombreCliente.value.trim()) {
    errorNombre.value = 'Por favor escribe tu nombre completo.'
    return
  }
  try {
    await apartarProducto(apartarProd.value.id, nombreCliente.value.trim())
    mostrarToast(`✅ ¡${apartarProd.value.nombre} apartado a nombre de ${nombreCliente.value.trim()}!`, 'success')
    apartarProd.value = null
  } catch {
    mostrarToast('⚠️ Error al apartar. Intenta de nuevo.', 'error')
  }
}

// ── Toast ────────────────────────────────────────────────────
const toast = ref({ show: false, msg: '', type: 'success' })
let toastTimer
const mostrarToast = (msg, type = 'success') => {
  clearTimeout(toastTimer)
  toast.value  = { show: true, msg, type }
  toastTimer   = setTimeout(() => { toast.value.show = false }, 3500)
}

// ── Panel admin — estado ─────────────────────────────────────
const adminPanelOpen = ref(false)
const adminTab       = ref('agregar') // 'agregar' | 'editar'
const guardando      = ref(false)
const uploadProgress = ref(0)

// ── Formulario nuevo producto ────────────────────────────────
const formNuevo = ref({
  nombre: '', grupo: '', categoria: 'Álbumes',
  precio: '', condicion: 'nuevo', estado: 'disponible', inclusiones: '',
})
const imagenFileNuevo    = ref(null)
const imagenPreviewNuevo = ref(null)

const onImageNuevo = (e) => {
  const f = e.target.files[0]
  if (!f) return
  imagenFileNuevo.value    = f
  imagenPreviewNuevo.value = URL.createObjectURL(f)
}
const limpiarImagenNuevo = () => {
  imagenFileNuevo.value    = null
  imagenPreviewNuevo.value = null
}
const limpiarFormNuevo = () => {
  formNuevo.value = { nombre: '', grupo: '', categoria: 'Álbumes', precio: '', condicion: 'nuevo', estado: 'disponible', inclusiones: '' }
  limpiarImagenNuevo()
  uploadProgress.value = 0
}

const submitNuevo = async () => {
  const { nombre, grupo, precio } = formNuevo.value
  if (!nombre || !grupo || !precio) return mostrarToast('⚠️ Nombre, grupo y precio son obligatorios.', 'error')
  if (!imagenFileNuevo.value)       return mostrarToast('⚠️ Agrega una foto del producto.', 'error')

  guardando.value = true
  try {
    const inclusiones = formNuevo.value.inclusiones
      ? formNuevo.value.inclusiones.split(',').map(s => s.trim()).filter(Boolean)
      : []
    await agregarProducto(
      { ...formNuevo.value, inclusiones },
      imagenFileNuevo.value,
      p => { uploadProgress.value = p }
    )
    limpiarFormNuevo()
    mostrarToast(`🌸 ${nombre} agregado al stock!`, 'success')
  } catch (e) {
    console.error(e)
    mostrarToast('⚠️ Error al guardar. Intenta de nuevo.', 'error')
  } finally {
    guardando.value = false
  }
}

// ── Formulario editar producto ───────────────────────────────
const prodEditando       = ref(null)
const formEditar         = ref({})
const imagenFileEditar   = ref(null)
const imagenPreviewEditar = ref(null)

const abrirEditar = (prod) => {
  prodEditando.value = prod
  formEditar.value   = {
    nombre:     prod.nombre,
    grupo:      prod.grupo,
    categoria:  prod.categoria,
    precio:     prod.precio,
    condicion:  prod.condicion,
    estado:     prod.estado,
    inclusiones: prod.inclusiones?.join(', ') || '',
  }
  imagenFileEditar.value    = null
  imagenPreviewEditar.value = prod.imagenUrl || null
  adminTab.value = 'editar'
}

const onImageEditar = (e) => {
  const f = e.target.files[0]
  if (!f) return
  imagenFileEditar.value    = f
  imagenPreviewEditar.value = URL.createObjectURL(f)
}

const submitEditar = async () => {
  if (!prodEditando.value) return
  guardando.value = true
  try {
    const inclusiones = formEditar.value.inclusiones
      ? formEditar.value.inclusiones.split(',').map(s => s.trim()).filter(Boolean)
      : []
    await editarProducto(
      prodEditando.value.id,
      { ...formEditar.value, inclusiones },
      imagenFileEditar.value,
      prodEditando.value.imagenPath,
      p => { uploadProgress.value = p }
    )
    mostrarToast(`✅ ${formEditar.value.nombre} actualizado!`, 'success')
    prodEditando.value = null
    adminTab.value     = 'agregar'
  } catch (e) {
    console.error(e)
    mostrarToast('⚠️ Error al editar.', 'error')
  } finally {
    guardando.value = false
  }
}

// ── Confirmar eliminación ────────────────────────────────────
const confirmarEliminar = async (prod) => {
  if (!confirm(`¿Eliminar "${prod.nombre}" del stock? Esta acción no se puede deshacer.`)) return
  try {
    await eliminarProducto(prod.id, prod.imagenPath)
    mostrarToast(`🗑️ ${prod.nombre} eliminado.`, 'success')
    if (modalProd.value?.id === prod.id) modalProd.value = null
  } catch {
    mostrarToast('⚠️ Error al eliminar.', 'error')
  }
}

// ── Acciones rápidas admin desde modal ───────────────────────
const accionRapida = async (accion, prod) => {
  try {
    if (accion === 'liberar')  await liberarProducto(prod.id)
    if (accion === 'vendido')  await marcarVendido(prod.id)
    modalProd.value = null
    mostrarToast(accion === 'liberar' ? '🟢 Producto disponible de nuevo.' : '✅ Marcado como vendido.', 'success')
  } catch {
    mostrarToast('⚠️ Error. Intenta de nuevo.', 'error')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.stock-page { min-height: 100vh; background: var(--cream); overflow-x: hidden; }

/* ══ HERO ══════════════════════════════════════════════════ */
.stock-hero {
  position: relative; overflow: hidden;
  padding: 110px 5vw 70px;
  text-align: center;
}
.stock-hero__bg { position: absolute; inset: 0; pointer-events: none; }
.sh-blob {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45;
  animation: blobDrift 10s ease-in-out infinite alternate;
}
.sh-blob--1 { width: 500px; height: 500px; background: rgba(244,143,177,.35); top: -150px; right: -80px; }
.sh-blob--2 { width: 320px; height: 320px; background: rgba(233,30,140,.18); bottom: -60px; left: 5%; animation-delay: 3s; }
.sh-blob--3 { width: 200px; height: 200px; background: rgba(252,228,236,.9); top: 30%; left: 40%; animation-delay: 6s; }
@keyframes blobDrift { from { transform: scale(1) translate(0,0); } to { transform: scale(1.12) translate(25px,-25px); } }

.stock-hero__content { position: relative; z-index: 2; }
.page-tag {
  display: inline-block; background: rgba(233,30,140,.1); color: var(--pink-deep);
  font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
  padding: 6px 18px; border-radius: 50px; margin-bottom: 18px;
}
.stock-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  color: var(--text); margin-bottom: 14px; line-height: 1.1;
}
.text-pink { color: var(--pink-accent); }
.stock-hero p { color: var(--text-light); font-size: 1.05rem; margin-bottom: 32px; }

.stock-hero__stats { display: inline-flex; align-items: center; gap: 28px; background: #fff; padding: 16px 32px; border-radius: 50px; box-shadow: 0 8px 32px rgba(233,30,140,.1); border: 1px solid rgba(233,30,140,.12); }
.sh-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.sh-stat strong { font-size: 1.4rem; color: var(--pink-accent); font-family: 'Playfair Display', serif; }
.sh-stat span { font-size: 0.75rem; color: var(--text-light); }
.sh-stat-div { width: 1px; height: 36px; background: rgba(233,30,140,.15); }

/* ══ FILTROS ══════════════════════════════════════════════ */
.filters-bar {
  position: sticky; top: 70px; z-index: 50;
  background: rgba(255,248,245,.9); backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(233,30,140,.1);
  padding: 0;
  box-shadow: 0 4px 20px rgba(233,30,140,.06);
}
.filters-bar__inner {
  max-width: 1300px; margin: 0 auto;
  padding: 14px 24px;
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
}

.search-box {
  display: flex; align-items: center; gap: 8px;
  background: #fff; border: 1.5px solid rgba(233,30,140,.15);
  border-radius: 50px; padding: 8px 16px;
  flex: 1; min-width: 200px; max-width: 300px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-box:focus-within { border-color: var(--pink-accent); box-shadow: 0 0 0 3px rgba(233,30,140,.08); }
.search-box__icon { font-size: 0.9rem; color: var(--text-light); }
.search-box input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--text); background: transparent; flex: 1; }
.search-box input::placeholder { color: var(--text-light); }
.search-box__clear { background: none; border: none; cursor: pointer; color: var(--text-light); font-size: 0.75rem; padding: 2px 4px; transition: color 0.2s; }
.search-box__clear:hover { color: var(--pink-accent); }

.cat-pills { display: flex; gap: 8px; flex-wrap: wrap; }
.cat-pill {
  background: #fff; border: 1.5px solid rgba(233,30,140,.15);
  color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
  padding: 7px 16px; border-radius: 50px; cursor: pointer;
  transition: all 0.25s; white-space: nowrap;
}
.cat-pill:hover { border-color: var(--pink-mid); background: rgba(233,30,140,.05); }
.cat-pill.active { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); color: #000000; border-color: transparent; box-shadow: 0 4px 14px rgba(233,30,140,.3); }

.estado-filter { display: flex; gap: 6px; }
.estado-btn {
  display: flex; align-items: center; gap: 6px;
  background: #fff; border: 1.5px solid rgba(233,30,140,.12);
  color: var(--text-light); font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
  padding: 7px 14px; border-radius: 50px; cursor: pointer;
  transition: all 0.25s;
}
.estado-btn:hover { border-color: var(--pink-mid); color: var(--text); }
.estado-btn.active { border-color: var(--pink-accent); color: var(--text); background: rgba(233,30,140,.06); }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot--disponible { background: #22c55e; }
.dot--apartado   { background: #f59e0b; }
.dot--vendido    { background: #ef4444; }

/* ══ GRID ══════════════════════════════════════════════════ */
.stock-main { padding: 48px 24px 100px; }
.stock-main__inner { max-width: 1300px; margin: 0 auto; }

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* ── Product Card ── */
.product-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid rgba(233,30,140,.1);
  box-shadow: 0 4px 20px rgba(233,30,140,.07);
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease;
  animation: cardIn 0.5s ease both;
  animation-delay: calc(var(--i) * 0.06s);
  position: relative;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}
.product-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 24px 60px rgba(233,30,140,.18);
  border-color: var(--pink-mid);
}
.product-card--apartado { opacity: 0.85; }
.product-card--vendido  { opacity: 0.65; filter: grayscale(0.3); }
.product-card--vendido:hover { transform: translateY(-4px) scale(1.01); }

/* Badges */
.product-card__badges {
  position: absolute; top: 12px; left: 12px; z-index: 3;
  display: flex; flex-direction: column; gap: 5px; align-items: flex-start;
}
.badge {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.5px;
  padding: 4px 10px; border-radius: 50px;
}
.badge--disponible { background: rgba(34,197,94,.15); color: #15803d; }
.badge--apartado   { background: rgba(245,158,11,.15); color: #b45309; }
.badge--vendido    { background: rgba(239,68,68,.12);  color: #b91c1c; }
.badge--new        { background: rgba(233,30,140,.12); color: var(--pink-deep); }
.badge--segunda    { background: rgba(99,102,241,.1);  color: #4338ca; }

/* Imagen */
.product-card__img {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #fff8f5, #fce4ec);
  overflow: hidden;
}
.product-card__img-inner {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.product-card__emoji {
  font-size: 4.5rem;
  transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), filter 0.35s;
  filter: drop-shadow(0 4px 12px rgba(233,30,140,.2));
}
.product-card:hover .product-card__emoji { transform: scale(1.15) rotate(-5deg); }

.product-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(233,30,140,.85), rgba(194,24,91,.9));
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #fff;
}
.product-card:hover .product-card__overlay { opacity: 1; }
.overlay-icon { font-size: 2rem; }
.overlay-text { font-size: 0.88rem; font-weight: 600; letter-spacing: 1px; }

/* Velo para apartado/vendido */
.product-card__veil {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(3px);
  font-size: 0.9rem; font-weight: 700; color: #fff;
  letter-spacing: 1px;
}
.product-card--apartado .product-card__veil { background: rgba(245,158,11,.45); }
.product-card--vendido   .product-card__veil { background: rgba(0,0,0,.35); }

/* Info */
.product-card__info { padding: 18px 18px 20px; }
.product-card__cat {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--pink-accent); margin-bottom: 6px;
}
.product-card__name {
  font-family: 'Playfair Display', serif; font-size: 1.05rem;
  color: var(--text); margin-bottom: 4px; line-height: 1.3;
}
.product-card__grupo { font-size: 0.8rem; color: var(--text-light); margin-bottom: 14px; }
.product-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.product-card__price { font-size: 1.1rem; font-weight: 700; color: var(--text); font-family: 'Playfair Display', serif; }
.btn-apartar {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #000000; border: none; padding: 8px 16px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(233,30,140,.28);
}
.btn-apartar:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(233,30,140,.4); }
.btn-apartar--lg { padding: 14px 28px; font-size: 0.95rem; width: 100%; justify-content: center; }
.footer-tag { font-size: 0.75rem; font-weight: 500; }
.footer-tag--apartado { color: #b45309; }
.footer-tag--vendido  { color: var(--pink-deep); }

/* Grid transition */
.grid-enter-active, .grid-leave-active { transition: all 0.4s ease; }
.grid-enter-from { opacity: 0; transform: scale(0.9) translateY(16px); }
.grid-leave-to   { opacity: 0; transform: scale(0.9) translateY(-8px); }

/* ── Empty state ── */
.empty-state {
  grid-column: 1 / -1;
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.empty-state span { font-size: 4rem; opacity: 0.5; }
.empty-state h3 { font-family: 'Playfair Display', serif; color: var(--text); font-size: 1.4rem; }
.empty-state p { color: var(--text-light); font-size: 0.9rem; }
.btn-ghost-sm {
  background: transparent; border: 1.5px solid var(--pink-mid); color: var(--pink-deep);
  padding: 9px 22px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
  cursor: pointer; transition: all 0.2s;
}
.btn-ghost-sm:hover { background: var(--pink-soft); }

/* ══ MODALES ═══════════════════════════════════════════════ */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(26,10,16,.5); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-card {
  background: #fff; border-radius: 28px; overflow: hidden;
  width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 40px 100px rgba(0,0,0,.3);
  position: relative;
}
.modal-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  background: rgba(0,0,0,.08); border: none; width: 32px; height: 32px; border-radius: 50%;
  cursor: pointer; font-size: 0.85rem; transition: background 0.2s;
}
.modal-close:hover { background: rgba(233,30,140,.15); }

.modal-card__img {
  height: 200px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  display: flex; align-items: center; justify-content: center;
  font-size: 5rem;
  position: relative;
}
.modal-card__img .badge { position: absolute; bottom: 14px; right: 14px; font-size: 0.78rem; }
.modal-card__body { padding: 28px; }
.modal-card__cat { font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--pink-accent); margin-bottom: 6px; }
.modal-card__body h2 { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: var(--text); margin-bottom: 6px; }
.modal-card__grupo { font-size: 0.9rem; color: var(--text-light); margin-bottom: 24px; }

.modal-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
.modal-detail-item { background: rgba(252,228,236,.35); border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 4px; }
.mdi-label { font-size: 0.75rem; color: var(--text-light); }
.modal-detail-item strong { font-size: 0.9rem; color: var(--text); }

.modal-inclusiones { margin-bottom: 24px; }
.modal-inclusiones .mdi-label { font-size: 0.78rem; color: var(--text-light); display: block; margin-bottom: 8px; }
.inclusion-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.inclusion-tag {
  background: rgba(233,30,140,.08); border: 1px solid rgba(233,30,140,.15);
  color: var(--pink-deep); padding: 4px 12px; border-radius: 50px; font-size: 0.78rem;
}

.modal-actions { margin-top: 4px; }
.modal-apartado-msg, .modal-vendido-msg {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 16px; border-radius: 14px; font-size: 0.88rem; line-height: 1.5;
}
.modal-apartado-msg { background: rgba(245,158,11,.1); color: #b45309; }
.modal-vendido-msg  { background: rgba(233,30,140,.08); color: var(--pink-deep); }
.modal-apartado-msg span, .modal-vendido-msg span { font-size: 1.4rem; flex-shrink: 0; }
.modal-apartado-msg p, .modal-vendido-msg p { margin: 0; }

/* Apartar */
.modal-card--apartar { padding: 0; }
.apartar-header {
  display: flex; align-items: center; gap: 16px;
  padding: 28px 28px 0;
}
.apartar-header span { font-size: 3rem; }
.apartar-header h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--text); }
.apartar-header p { font-size: 0.85rem; color: var(--text-light); }

.apartar-info { display: flex; flex-direction: column; gap: 8px; padding: 20px 28px; }
.apartar-info__item {
  font-size: 0.85rem; color: var(--text);
  padding: 10px 14px; border-radius: 12px;
  background: rgba(252,228,236,.4);
  border: 1px solid rgba(233,30,140,.08);
}
.apartar-info__item--highlight {
  background: linear-gradient(135deg, rgba(233,30,140,.1), rgba(244,143,177,.1));
  border-color: rgba(233,30,140,.2); font-weight: 500;
}

.apartar-form { padding: 0 28px 8px; }
.apartar-form label { font-size: 0.82rem; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
.apartar-form input {
  width: 100%; padding: 12px 16px; border-radius: 14px;
  border: 1.5px solid rgba(233,30,140,.2);
  font-family: 'DM Sans', sans-serif; font-size: 0.92rem; color: var(--text);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.apartar-form input:focus { border-color: var(--pink-accent); box-shadow: 0 0 0 3px rgba(233,30,140,.08); }
.form-error { font-size: 0.8rem; color: #ef4444; margin-top: 6px; }

.apartar-actions {
  display: flex; gap: 10px; padding: 20px 28px 28px;
  justify-content: flex-end;
}

/* Modal transition */
.modal-enter-active { transition: all 0.3s cubic-bezier(.34,1.56,.64,1); }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from   { opacity: 0; transform: scale(0.9) translateY(20px); }
.modal-leave-to     { opacity: 0; transform: scale(0.95); }

/* ══ TOAST ══════════════════════════════════════════════════ */
.toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 999; padding: 14px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
  box-shadow: 0 8px 30px rgba(0,0,0,.2); white-space: nowrap;
}
.toast--success { background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent)); color: #000000; }
.toast--error   { background: #ef4444; color: #fff; }
.toast-enter-active { transition: all 0.4s cubic-bezier(.34,1.56,.64,1); }
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

/* ══ PANEL ADMIN ════════════════════════════════════════════ */
.admin-panel {
  position: fixed; bottom: 100px; right: 24px; z-index: 150;
  background: #fff; border-radius: 24px; width: 540px; max-width: calc(100vw - 48px);
  box-shadow: 0 20px 80px rgba(0,0,0,.18);
  border: 1.5px solid rgba(233,30,140,.15);
  overflow: hidden;
}
.admin-panel__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  border-bottom: 1px solid rgba(233,30,140,.1);
}
.admin-panel__header h3 { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--text); }
.admin-panel__header button { background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--text-light); }
.admin-panel__body { padding: 20px 24px; }
.admin-panel__body h4 { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); margin-bottom: 16px; }

.admin-form { display: flex; flex-direction: column; gap: 12px; }
.admin-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.admin-field { display: flex; flex-direction: column; gap: 5px; }
.admin-field--full { grid-column: 1 / -1; }
.admin-field label { font-size: 0.75rem; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.4px; }
.admin-field input, .admin-field select {
  padding: 9px 13px; border-radius: 12px;
  border: 1.5px solid rgba(233,30,140,.15);
  font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text);
  outline: none; background: #fff; transition: border-color 0.2s;
}
.admin-field input:focus, .admin-field select:focus { border-color: var(--pink-accent); }

.btn-admin-add {
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  color: #000000; border: none; padding: 12px; border-radius: 14px;
  font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
  cursor: pointer; transition: all 0.25s;
  box-shadow: 0 6px 20px rgba(233,30,140,.28);
}
.btn-admin-add:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(233,30,140,.38); }

.slide-up-enter-active { transition: all 0.35s cubic-bezier(.34,1.56,.64,1); }
.slide-up-leave-active { transition: all 0.2s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px) scale(0.97); }

/* FAB */
.fab-admin {
  position: fixed; bottom: 32px; right: 28px; z-index: 160;
  width: 52px; height: 52px; border-radius: 50%;
  background: linear-gradient(135deg, var(--pink-mid), var(--pink-accent));
  border: none; color: #000000; font-size: 1.3rem; cursor: pointer;
  box-shadow: 0 8px 28px rgba(233,30,140,.4);
  transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
}
.fab-admin:hover { transform: scale(1.1) rotate(15deg); box-shadow: 0 12px 36px rgba(233,30,140,.5); }

/* ══ RESPONSIVE ═════════════════════════════════════════════ */
@media (max-width: 768px) {
  .filters-bar__inner { gap: 8px; }
  .search-box { max-width: 100%; }
  .cat-pills { gap: 6px; }
  .cat-pill { font-size: 0.78rem; padding: 6px 12px; }
  .products-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .modal-detail-grid { grid-template-columns: 1fr; }
  .admin-panel { bottom: 90px; right: 12px; width: calc(100vw - 24px); }
  .admin-form__row { grid-template-columns: 1fr; }
  .stock-hero__stats { flex-direction: column; gap: 12px; padding: 16px 24px; }
  .sh-stat-div { width: 60px; height: 1px; }
}
</style>