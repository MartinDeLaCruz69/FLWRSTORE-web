<template>
  <div class="ventas-page">
    <!-- ══ HERO ══ -->
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__content">
        <span class="page-tag">{{
          esAdmin ? "🛠️ Admin" : "🌸 Mi cuenta"
        }}</span>
        <h1>
          {{ esAdmin ? "Historial de" : "Mis" }}
          <span class="text-pink">{{ esAdmin ? "Ventas" : "Compras" }}</span>
        </h1>
        <p>
          {{
            esAdmin
              ? "Registro completo de todos los pedidos confirmados 💼"
              : "Aquí aparecen tus compras confirmadas 💖"
          }}
        </p>

        <!-- Stats solo admin -->
        <div v-if="esAdmin && !cargando" class="hero-stats">
          <div class="hero-stat">
            <strong>{{ ventas.length }}</strong>
            <span>Ventas</span>
          </div>
          <div class="hero-stat-div"></div>
          <div class="hero-stat">
            <strong>${{ totalIngresos.toLocaleString() }}</strong>
            <span>MXN total</span>
          </div>
          <div class="hero-stat-div"></div>
          <div class="hero-stat">
            <strong>{{ clientesUnicos }}</strong>
            <span>Clientes</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FILTROS (solo admin) ══ -->
    <div v-if="esAdmin" class="filters-bar">
      <div class="filters-bar__inner">
        <div class="search-box">
          <span>🔍</span>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por cliente, producto, grupo..."
          />
          <button v-if="busqueda" class="search-clear" @click="busqueda = ''">
            ✕
          </button>
        </div>

        <div class="filter-pills">
          <button
            v-for="f in filtrosTipo"
            :key="f.val"
            class="filter-pill"
            :class="{ active: filtroTipo === f.val }"
            @click="filtroTipo = f.val"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- ══ CONTENIDO ══ -->
    <div class="ventas-content">
      <!-- Cargando auth o ventas -->
      <div v-if="!listoPararender || cargando" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando {{ esAdmin ? "ventas" : "tus compras" }}... 🌸</p>
      </div>

      <!-- Sin ventas -->
      <div v-else-if="ventasFiltradas.length === 0" class="empty-state">
        <span>{{ esAdmin ? "📦" : "🌸" }}</span>
        <h3>
          {{ esAdmin ? "No hay ventas registradas" : "Aún no tienes compras" }}
        </h3>
        <p>
          {{
            esAdmin
              ? "Cuando marques un producto como vendido aparecerá aquí."
              : "Cuando confirmes un pago con el equipo de FLWRSTORE, tu compra aparecerá aquí. Si ya compraste algo, el equipo puede asignarlo a tu cuenta desde el historial admin."
          }}
        </p>
        <router-link v-if="!esAdmin" to="/stock" class="btn-primary">
          Ver Stock disponible →
        </router-link>
      </div>

      <!-- Lista de ventas -->
      <div v-else class="ventas-lista">
        <div
          v-for="(venta, i) in ventasFiltradas"
          :key="venta.id"
          class="venta-card"
          :style="{ '--i': i }"
        >
          <!-- Imagen -->
          <div class="venta-card__img">
            <img
              v-if="venta.imagenUrl"
              :src="venta.imagenUrl"
              :alt="venta.nombreProducto"
            />
            <span v-else class="venta-card__emoji">
              {{ catEmoji[venta.categoria] || "🎵" }}
            </span>
            <span class="venta-card__badge">
              {{ venta.esLote ? "📦 Lote" : venta.categoria }}
            </span>
          </div>

          <!-- Info -->
          <div class="venta-card__body">
            <!-- Header -->
            <div class="venta-card__header">
              <div>
                <h3>{{ venta.nombreProducto }}</h3>
                <p class="venta-card__grupo">🎤 {{ venta.grupo }}</p>
              </div>
              <div class="venta-card__fecha">
                {{ formatearFecha(venta.fechaVenta) }}
              </div>
            </div>

            <!-- Grid de datos -->
            <div class="venta-card__grid">
              <div class="venta-dato">
                <span class="dato-label">💰 Total pagado</span>
                <strong class="dato-valor dato-valor--precio">
                  ${{ Number(venta.precioFinal).toLocaleString() }} MXN
                </strong>
              </div>

              <div class="venta-dato" v-if="esAdmin">
                <span class="dato-label">👤 Cliente</span>
                <strong class="dato-valor">{{ venta.nombreCliente }}</strong>
              </div>

              <div class="venta-dato">
                <span class="dato-label">📋 Tipo</span>
                <strong class="dato-valor">
                  {{ venta.esLote ? "📦 Lote" : "🎁 Producto" }}
                  <span v-if="venta.asignadoPorAdmin" class="badge-admin">
                    Admin
                  </span>
                </strong>
              </div>

              <div class="venta-dato" v-if="venta.notas">
                <span class="dato-label">📝 Notas</span>
                <strong class="dato-valor dato-valor--notas">{{
                  venta.notas
                }}</strong>
              </div>
            </div>

            <!-- Items del lote comprados -->
            <div
              v-if="venta.esLote && venta.itemsComprados?.length"
              class="venta-items"
            >
              <span class="dato-label">🛍️ Items comprados</span>
              <div class="venta-items__list">
                <span
                  v-for="item in venta.itemsComprados"
                  :key="item.id"
                  class="venta-item-tag"
                >
                  {{ item.nombre }} — ${{
                    Number(item.precio).toLocaleString()
                  }}
                  MXN
                </span>
              </div>
            </div>

            <!-- Acciones admin -->
            <div v-if="esAdmin" class="venta-card__actions">
              <button
                class="btn-action btn-action--edit"
                @click="abrirEditar(venta)"
              >
                ✏️ Editar
              </button>
              <button
                class="btn-action btn-action--delete"
                @click="confirmarEliminar(venta)"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ MODAL EDITAR VENTA (admin) ══ -->
    <Transition name="modal">
      <div
        v-if="modalEditar"
        class="modal-backdrop"
        @click.self="modalEditar = null"
      >
        <div class="modal-card">
          <button class="modal-close" @click="modalEditar = null">✕</button>

          <div class="modal-header">
            <span>✏️</span>
            <div>
              <h3>Editar venta</h3>
              <p>{{ modalEditar.nombreProducto }}</p>
            </div>
          </div>

          <div class="modal-form">
            <div class="modal-field">
              <label>Cliente</label>
              <input
                v-model="formEditar.nombreCliente"
                placeholder="Nombre del cliente"
              />
            </div>
            <div class="modal-field">
              <label>Email del cliente (opcional)</label>
              <input
                v-model="formEditar.emailCliente"
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </div>
            <div class="modal-field">
              <label>Precio final cobrado (MXN)</label>
              <input
                v-model.number="formEditar.precioFinal"
                type="number"
                placeholder="350"
              />
            </div>
            <div class="modal-field">
              <label>Notas</label>
              <input
                v-model="formEditar.notas"
                placeholder="Ej: pagó transferencia, envío incluido..."
              />
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn-ghost" @click="modalEditar = null">
              Cancelar
            </button>
            <button
              class="btn-save"
              @click="guardarEdicion"
              :disabled="guardando"
            >
              <span v-if="!guardando">💾 Guardar</span>
              <span v-else>Guardando...</span>
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useVentas } from "../composables/useVentas";
import { usuarioActual, rolActual, authCargando } from "../composables/useAuth";

// ── Rol ──────────────────────────────────────────────────────
const esAdmin = computed(
  () => rolActual.value === "admin" || rolActual.value === "subadmin",
);

// ── Instancia de useVentas según rol ─────────────────────────
const uid = computed(() => usuarioActual.value?.uid || null);

const ventasAdmin = useVentas({ soloMias: false });
const ventasCliente = useVentas({ soloMias: true, uid });

const ventas = computed(() =>
  esAdmin.value ? ventasAdmin.ventas.value : ventasCliente.ventas.value,
);
const cargando = computed(() =>
  esAdmin.value ? ventasAdmin.cargando.value : ventasCliente.cargando.value,
);
const listoPararender = computed(() => !authCargando.value);

const { editarVenta, eliminarVenta } = ventasAdmin;

// ── Catálogo emojis ──────────────────────────────────────────
const catEmoji = {
  Álbumes: "🎵",
  Photocards: "📸",
  Peluches: "🧸",
  Lightsticks: "✨",
  Revistas: "📖",
  LLaveros: "🔑",
  Lote: "📦",
};

// ── Filtros (admin) ──────────────────────────────────────────
const busqueda = ref("");
const filtroTipo = ref("todos");
const filtrosTipo = [
  { val: "todos", label: "Todos" },
  { val: "producto", label: "🎁 Productos" },
  { val: "lote", label: "📦 Lotes" },
  { val: "sinAsignar", label: "⚠️ Sin asignar" },
];

const ventasFiltradas = computed(() => {
  let lista = ventas.value.filter((v) => !v.eliminada);

  if (filtroTipo.value === "producto") lista = lista.filter((v) => !v.esLote);
  if (filtroTipo.value === "lote") lista = lista.filter((v) => v.esLote);
  if (filtroTipo.value === "sinAsignar")
    lista = lista.filter((v) => v.nombreCliente === "Sin asignar");

  if (busqueda.value.trim()) {
    const b = busqueda.value.toLowerCase().trim();
    lista = lista.filter(
      (v) =>
        v.nombreProducto?.toLowerCase().includes(b) ||
        v.nombreCliente?.toLowerCase().includes(b) ||
        v.grupo?.toLowerCase().includes(b) ||
        v.notas?.toLowerCase().includes(b),
    );
  }

  return lista;
});

// ── Stats admin ──────────────────────────────────────────────
const totalIngresos = computed(() =>
  ventas.value.reduce((a, v) => a + Number(v.precioFinal || 0), 0),
);

const clientesUnicos = computed(
  () => new Set(ventas.value.map((v) => v.nombreCliente).filter(Boolean)).size,
);

// ── Formatear fecha ──────────────────────────────────────────
const formatearFecha = (fecha) => {
  if (!fecha) return "Sin fecha";
  const d =
    typeof fecha?.toDate === "function" ? fecha.toDate() : new Date(fecha);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ── Modal editar ─────────────────────────────────────────────
const modalEditar = ref(null);
const guardando = ref(false);
const formEditar = ref({
  nombreCliente: "",
  emailCliente: "",
  precioFinal: "",
  notas: "",
});

const abrirEditar = (venta) => {
  modalEditar.value = venta;
  formEditar.value = {
    nombreCliente: venta.nombreCliente || "",
    emailCliente: venta.emailCliente || "",
    precioFinal: venta.precioFinal || "",
    notas: venta.notas || "",
  };
};

const guardarEdicion = async () => {
  if (!modalEditar.value) return;
  guardando.value = true;
  try {
    await editarVenta(modalEditar.value.id, {
      nombreCliente: formEditar.value.nombreCliente,
      emailCliente: formEditar.value.emailCliente,
      precioFinal: Number(formEditar.value.precioFinal) || 0,
      notas: formEditar.value.notas,
    });
    mostrarToast("✅ Venta actualizada.", "success");
    modalEditar.value = null;
  } catch (e) {
    console.error(e);
    mostrarToast("⚠️ Error al guardar.", "error");
  } finally {
    guardando.value = false;
  }
};

// ── Eliminar ─────────────────────────────────────────────────
const confirmarEliminar = async (venta) => {
  if (
    !confirm(
      `¿Eliminar la venta de "${venta.nombreProducto}" para ${venta.nombreCliente}? Esta acción no se puede deshacer.`,
    )
  )
    return;
  try {
    await eliminarVenta(venta.id);
    mostrarToast("🗑️ Venta eliminada.", "success");
  } catch {
    mostrarToast("⚠️ Error al eliminar.", "error");
  }
};

// ── Toast ────────────────────────────────────────────────────
const toast = ref({ show: false, msg: "", type: "success" });
let toastTimer;
const mostrarToast = (msg, type = "success") => {
  clearTimeout(toastTimer);
  toast.value = { show: true, msg, type };
  toastTimer = setTimeout(() => {
    toast.value.show = false;
  }, 3500);
};

// ── Scroll lock modal ────────────────────────────────────────
let scrollY = 0;
watch(modalEditar, (val) => {
  if (val) {
    scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  } else {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap");

.ventas-page {
  min-height: 100vh;
  background: var(--cream, #fff8f5);
}

/* ══ HERO ══════════════════════════════════════════════════ */
.page-hero {
  position: relative;
  padding: 84px 5vw 40px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.page-tag {
  display: inline-block;
  background: rgba(233, 30, 140, 0.1);
  color: #c2185b;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 50px;
}
.page-hero h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  color: #1a1a1a;
  margin: 0;
}
.text-pink {
  color: #e91e8c;
}
.page-hero p {
  font-size: 1.05rem;
  color: #555;
  margin: 0;
}

/* Stats hero */
.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  background: #fff;
  padding: 14px 28px;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(233, 30, 140, 0.1);
  border: 1px solid rgba(233, 30, 140, 0.12);
  margin-top: 8px;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.hero-stat strong {
  font-size: 1.3rem;
  color: #e91e8c;
  font-family: "Playfair Display", serif;
}
.hero-stat span {
  font-size: 0.72rem;
  color: #888;
}
.hero-stat-div {
  width: 1px;
  height: 32px;
  background: rgba(233, 30, 140, 0.15);
}

/* ══ FILTROS ═══════════════════════════════════════════════ */
.filters-bar {
  position: sticky;
  top: 70px;
  z-index: 50;
  background: rgba(255, 248, 245, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(233, 30, 140, 0.1);
  box-shadow: 0 4px 20px rgba(233, 30, 140, 0.06);
}
.filters-bar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1.5px solid rgba(233, 30, 140, 0.15);
  border-radius: 50px;
  padding: 8px 16px;
  flex: 1;
  min-width: 220px;
  max-width: 340px;
}
.search-box:focus-within {
  border-color: #e91e8c;
  box-shadow: 0 0 0 3px rgba(233, 30, 140, 0.08);
}
.search-box input {
  border: none;
  outline: none;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  color: #1a1a1a;
  background: transparent;
  flex: 1;
}
.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 0.75rem;
}
.filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-pill {
  background: #fff;
  border: 1.5px solid rgba(233, 30, 140, 0.15);
  color: #555;
  font-family: "DM Sans", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.filter-pill:hover {
  border-color: #e91e8c;
  background: rgba(233, 30, 140, 0.04);
}
.filter-pill.active {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 3px 12px rgba(233, 30, 140, 0.28);
}

/* ══ CONTENIDO ══════════════════════════════════════════════ */
.ventas-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 120px;
}

/* ── Loading / Empty ─────────────────────────────────────── */
.loading-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #555;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(233, 30, 140, 0.15);
  border-top-color: #e91e8c;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.empty-state span {
  font-size: 4rem;
}
.empty-state h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #1a1a1a;
}
.empty-state p {
  font-size: 0.95rem;
  max-width: 400px;
  line-height: 1.6;
}
.btn-primary {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(233, 30, 140, 0.3);
  transition: all 0.3s;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(233, 30, 140, 0.4);
}

/* ══ LISTA DE VENTAS ════════════════════════════════════════ */
.ventas-lista {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.venta-card {
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  border: 1.5px solid rgba(233, 30, 140, 0.1);
  box-shadow: 0 4px 20px rgba(233, 30, 140, 0.07);
  display: grid;
  grid-template-columns: 180px 1fr;
  animation: cardIn 0.45s ease both;
  animation-delay: calc(var(--i) * 0.07s);
  transition:
    box-shadow 0.3s,
    border-color 0.3s;
}
.venta-card:hover {
  box-shadow: 0 10px 36px rgba(233, 30, 140, 0.13);
  border-color: rgba(233, 30, 140, 0.2);
}
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Imagen */
.venta-card__img {
  position: relative;
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  overflow: hidden;
}
.venta-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.venta-card__emoji {
  font-size: 3.5rem;
}
.venta-card__badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(233, 30, 140, 0.15);
  color: #c2185b;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 50px;
}

/* Body */
.venta-card__body {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.venta-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.venta-card__header h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.15rem;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}
.venta-card__grupo {
  font-size: 0.82rem;
  color: #555;
  margin: 3px 0 0;
}
.venta-card__fecha {
  font-size: 0.72rem;
  color: #888;
  white-space: nowrap;
  flex-shrink: 0;
  background: rgba(233, 30, 140, 0.06);
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid rgba(233, 30, 140, 0.12);
}

/* Grid de datos */
.venta-card__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
}
.venta-dato {
  background: rgba(252, 228, 236, 0.3);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.dato-label {
  font-size: 0.7rem;
  color: #888;
}
.dato-valor {
  font-size: 0.88rem;
  color: #1a1a1a;
}
.dato-valor--precio {
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  color: #e91e8c;
}
.dato-valor--notas {
  font-size: 0.8rem;
  color: #555;
  font-weight: 400;
}
.badge-admin {
  display: inline-block;
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 50px;
  margin-left: 4px;
  vertical-align: middle;
}

/* Items lote */
.venta-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.venta-items__list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.venta-item-tag {
  background: rgba(233, 30, 140, 0.07);
  border: 1px solid rgba(233, 30, 140, 0.15);
  color: #c2185b;
  padding: 4px 11px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Acciones admin */
.venta-card__actions {
  display: flex;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid rgba(233, 30, 140, 0.08);
}
.btn-action {
  padding: 7px 16px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  font-family: "DM Sans", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action--edit {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.25);
  color: #1d4ed8;
}
.btn-action--edit:hover {
  background: rgba(59, 130, 246, 0.15);
}
.btn-action--delete {
  background: rgba(239, 68, 68, 0.07);
  border-color: rgba(239, 68, 68, 0.2);
  color: #b91c1c;
}
.btn-action--delete:hover {
  background: rgba(239, 68, 68, 0.13);
}

/* ══ MODAL EDITAR ══════════════════════════════════════════ */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(26, 10, 16, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-card {
  background: #fff;
  border-radius: 28px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 0 0 28px;
}
.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}
.modal-close:hover {
  background: rgba(0, 0, 0, 0.12);
}
.modal-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 0;
}
.modal-header span {
  font-size: 2.2rem;
}
.modal-header h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  color: #1a1a1a;
  margin: 0;
}
.modal-header p {
  font-size: 0.82rem;
  color: #555;
  margin: 3px 0 0;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px 4px;
}
.modal-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.modal-field label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.modal-field input {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1.5px solid rgba(233, 30, 140, 0.18);
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  color: #1a1a1a;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.modal-field input:focus {
  border-color: #e91e8c;
  box-shadow: 0 0 0 3px rgba(233, 30, 140, 0.08);
}
.modal-actions {
  display: flex;
  gap: 10px;
  padding: 16px 24px 0;
  justify-content: flex-end;
}
.btn-ghost {
  background: transparent;
  border: 1.5px solid rgba(233, 30, 140, 0.2);
  color: #555;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover {
  border-color: #e91e8c;
  color: #1a1a1a;
}
.btn-save {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 12px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(233, 30, 140, 0.28);
  transition: all 0.25s;
}
.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(233, 30, 140, 0.38);
}
.btn-save:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ══ TOAST ═════════════════════════════════════════════════ */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 13px 26px;
  border-radius: 50px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}
.toast--success {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
}
.toast--error {
  background: #ef4444;
  color: #fff;
}
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.92) translateY(16px);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* ══ RESPONSIVE ════════════════════════════════════════════ */
@media (max-width: 768px) {
  .page-hero {
    padding: 74px 16px 28px;
  }
  .page-hero h1 {
    font-size: clamp(1.8rem, 7vw, 2.8rem);
  }
  .hero-stats {
    gap: 12px;
    padding: 12px 16px;
  }
  .hero-stat strong {
    font-size: 1.05rem;
  }

  .filters-bar__inner {
    flex-direction: column;
    align-items: stretch;
    padding: 10px 12px;
  }
  .search-box {
    max-width: 100%;
  }

  .ventas-content {
    padding: 24px 12px 80px;
  }

  /* Cards apiladas */
  .venta-card {
    grid-template-columns: 1fr;
  }
  .venta-card__img {
    min-height: 180px;
    max-height: 200px;
  }
  .venta-card__body {
    padding: 14px;
    gap: 10px;
  }
  .venta-card__header {
    flex-direction: column;
    gap: 6px;
  }
  .venta-card__fecha {
    align-self: flex-start;
  }
  .venta-card__grid {
    grid-template-columns: 1fr 1fr;
  }
  .venta-card__actions {
    flex-direction: row;
  }

  /* Modal */
  .modal-backdrop {
    padding: 0;
    align-items: flex-end;
  }
  .modal-card {
    border-radius: 28px 28px 0 0;
    max-height: 92vh;
    max-width: 100%;
  }

  .toast {
    bottom: 80px;
    max-width: calc(100vw - 32px);
    white-space: normal;
    text-align: center;
    font-size: 0.82rem;
  }
}

@media (max-width: 380px) {
  .venta-card__grid {
    grid-template-columns: 1fr;
  }
}
</style>
