<template>
  <div class="stats-page">
    <!-- ══ HERO ══ -->
    <section class="stats-hero">
      <div class="stats-hero__bg"></div>
      <div class="stats-hero__content">
        <span class="page-tag">🛠️ ADMIN</span>
        <h1>Tu tienda,<br /><span class="text-pink">en números</span></h1>
        <p>Historial completo + últimos 30 días</p>

        <!-- Selector de período -->
        <div class="periodo-selector">
          <button
            class="periodo-btn"
            :class="{ active: periodo === '30dias' }"
            @click="periodo = '30dias'"
          >
            Últimos 30 días
          </button>
          <button
            class="periodo-btn"
            :class="{ active: periodo === 'total' }"
            @click="periodo = 'total'"
          >
            Histórico total
          </button>
        </div>
      </div>
    </section>

    <!-- ══ CONTENIDO ══ -->
    <div class="stats-content">
      <!-- Cargando -->
      <div v-if="cargando" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Calculando estadísticas... 🌸</p>
      </div>

      <template v-else>
        <!-- ── KPIs principales ── -->
        <div class="kpi-grid">
          <div class="kpi-card kpi-card--ventas">
            <span class="kpi-icon">🛍️</span>
            <div class="kpi-body">
              <span class="kpi-label">Ventas confirmadas</span>
              <strong class="kpi-value">{{ stats.totalVentas }}</strong>
            </div>
          </div>
          <div class="kpi-card kpi-card--ingresos">
            <span class="kpi-icon">💰</span>
            <div class="kpi-body">
              <span class="kpi-label">Ingresos totales</span>
              <strong class="kpi-value"
                >${{ stats.totalIngresos.toLocaleString("es-MX") }} MXN</strong
              >
            </div>
          </div>
          <div class="kpi-card kpi-card--clientes">
            <span class="kpi-icon">👤</span>
            <div class="kpi-body">
              <span class="kpi-label">Clientes únicos</span>
              <strong class="kpi-value">{{ stats.clientesUnicos }}</strong>
            </div>
          </div>
          <div class="kpi-card kpi-card--ticket">
            <span class="kpi-icon">🎯</span>
            <div class="kpi-body">
              <span class="kpi-label">Ticket promedio</span>
              <strong class="kpi-value"
                >${{ stats.ticketPromedio.toLocaleString("es-MX") }} MXN</strong
              >
            </div>
          </div>
        </div>

        <!-- ── Dos columnas: productos + clientes ── -->
        <div class="stats-grid">
          <!-- Productos más vendidos -->
          <div class="stats-card">
            <div class="stats-card__header">
              <h2>🏆 Productos más vendidos</h2>
              <span class="stats-card__sub"
                >Por número de ventas confirmadas</span
              >
            </div>

            <div
              v-if="stats.productosMasVendidos.length === 0"
              class="stats-empty"
            >
              <span>📦</span>
              <p>Sin ventas en este período</p>
            </div>

            <div v-else class="ranking-list">
              <div
                v-for="(prod, i) in stats.productosMasVendidos"
                :key="prod.nombre"
                class="ranking-item"
              >
                <span
                  class="ranking-pos"
                  :class="`ranking-pos--${i < 3 ? i + 1 : 'rest'}`"
                >
                  {{ i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1 }}
                </span>
                <div class="ranking-info">
                  <strong>{{ prod.nombre }}</strong>
                  <span>{{ prod.grupo }} · {{ prod.categoria }}</span>
                </div>
                <div class="ranking-stats">
                  <span class="ranking-count"
                    >{{ prod.ventas }} venta{{
                      prod.ventas !== 1 ? "s" : ""
                    }}</span
                  >
                  <span class="ranking-monto"
                    >${{ prod.ingresos.toLocaleString("es-MX") }}</span
                  >
                </div>
                <!-- Barra de progreso relativa -->
                <div class="ranking-bar">
                  <div
                    class="ranking-bar__fill"
                    :style="{
                      width: stats.productosMasVendidos[0]?.ventas
                        ? (prod.ventas / stats.productosMasVendidos[0].ventas) *
                            100 +
                          '%'
                        : '0%',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Clientes frecuentes -->
          <div class="stats-card">
            <div class="stats-card__header">
              <h2>💖 Clientes frecuentes</h2>
              <span class="stats-card__sub"
                >Por total de compras confirmadas</span
              >
            </div>

            <div
              v-if="stats.clientesFrecuentes.length === 0"
              class="stats-empty"
            >
              <span>👥</span>
              <p>Sin datos de clientes en este período</p>
            </div>

            <div v-else class="clientes-list">
              <div
                v-for="(cliente, i) in stats.clientesFrecuentes"
                :key="cliente.nombre"
                class="cliente-item"
                :class="{ 'cliente-item--top': i === 0 }"
              >
                <div class="cliente-avatar">
                  {{ cliente.nombre.charAt(0).toUpperCase() }}
                </div>
                <div class="cliente-info">
                  <strong>{{ cliente.nombre }}</strong>
                  <span
                    >{{ cliente.compras }} compra{{
                      cliente.compras !== 1 ? "s" : ""
                    }}</span
                  >
                </div>
                <div class="cliente-monto">
                  ${{ cliente.total.toLocaleString("es-MX") }}
                  <span>MXN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Ventas por categoría ── -->
        <div class="stats-card stats-card--full">
          <div class="stats-card__header">
            <h2>📊 Ventas por categoría</h2>
            <span class="stats-card__sub">Distribución de ingresos</span>
          </div>

          <div v-if="stats.porCategoria.length === 0" class="stats-empty">
            <span>📂</span>
            <p>Sin datos en este período</p>
          </div>

          <div v-else class="categoria-grid">
            <div
              v-for="cat in stats.porCategoria"
              :key="cat.categoria"
              class="categoria-item"
            >
              <div class="categoria-header">
                <span class="categoria-emoji">{{
                  catEmoji[cat.categoria] || "🎵"
                }}</span>
                <div>
                  <strong>{{ cat.categoria }}</strong>
                  <span
                    >{{ cat.ventas }} venta{{
                      cat.ventas !== 1 ? "s" : ""
                    }}</span
                  >
                </div>
                <strong class="categoria-monto">
                  ${{ cat.ingresos.toLocaleString("es-MX") }}
                </strong>
              </div>
              <!-- Barra horizontal -->
              <div class="categoria-bar">
                <div
                  class="categoria-bar__fill"
                  :style="{
                    width: stats.porCategoria[0]?.ingresos
                      ? (cat.ingresos / stats.porCategoria[0].ingresos) * 100 +
                        '%'
                      : '0%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Ventas recientes ── -->
        <div class="stats-card stats-card--full">
          <div class="stats-card__header">
            <h2>🕐 Últimas ventas</h2>
            <span class="stats-card__sub"
              >Las 10 más recientes del período</span
            >
          </div>

          <div v-if="stats.ventasRecientes.length === 0" class="stats-empty">
            <span>📋</span>
            <p>Sin ventas en este período</p>
          </div>

          <div v-else class="ventas-recientes">
            <div
              v-for="venta in stats.ventasRecientes"
              :key="venta.id"
              class="venta-reciente-item"
            >
              <div class="venta-reciente__img">
                <img
                  v-if="venta.imagenUrl"
                  :src="venta.imagenUrl"
                  :alt="venta.nombreProducto"
                  loading="lazy"
                />
                <span v-else>{{ catEmoji[venta.categoria] || "🎵" }}</span>
              </div>
              <div class="venta-reciente__info">
                <strong>{{ venta.nombreProducto }}</strong>
                <span
                  >{{ venta.grupo }} ·
                  {{ formatearFecha(venta.fechaVenta) }}</span
                >
              </div>
              <div class="venta-reciente__cliente">
                <span>👤</span>
                {{ venta.nombreCliente }}
              </div>
              <div class="venta-reciente__monto">
                ${{ Number(venta.precioFinal).toLocaleString("es-MX") }} MXN
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useVentas } from "../composables/useVentas";
import { rolActual, authCargando } from "../composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();

// Proteger ruta
watch(
  [rolActual, authCargando],
  ([rol, cargando]) => {
    if (cargando) return;
    if (rol !== null && rol !== "admin" && rol !== "subadmin") {
      router.replace("/home");
    }
  },
  { immediate: true },
);

const periodo = ref("30dias");

const catEmoji = {
  Álbumes: "🎵",
  Photocards: "📸",
  Peluches: "🧸",
  Lightsticks: "✨",
  Revistas: "📖",
  LLaveros: "🔑",
  Lote: "📦",
};

// ── Traer todas las ventas ────────────────────────────────────
const { ventas, cargando: cargandoVentas } = useVentas({ soloMias: false });
const cargando = computed(() => authCargando.value || cargandoVentas.value);

// ── Filtrar por período ───────────────────────────────────────
const ventasFiltradas = computed(() => {
  const todas = ventas.value.filter((v) => !v.eliminada);
  if (periodo.value === "total") return todas;

  const hace30 = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return todas.filter((v) => {
    if (!v.fechaVenta) return false;
    const ms =
      typeof v.fechaVenta?.toDate === "function"
        ? v.fechaVenta.toDate().getTime()
        : new Date(v.fechaVenta).getTime();
    return ms >= hace30;
  });
});

// ── Calcular todas las estadísticas ──────────────────────────
const stats = computed(() => {
  const lista = ventasFiltradas.value;

  // KPIs básicos
  const totalVentas = lista.length;
  const totalIngresos = lista.reduce(
    (a, v) => a + Number(v.precioFinal || 0),
    0,
  );
  const nombresClientes = new Set(
    lista.map((v) => v.nombreCliente).filter((n) => n && n !== "Sin asignar"),
  );
  const clientesUnicos = nombresClientes.size;
  const ticketPromedio =
    totalVentas > 0 ? Math.round(totalIngresos / totalVentas) : 0;

  // Productos más vendidos
  const prodMap = {};
  for (const v of lista) {
    const key = v.nombreProducto || "Sin nombre";
    if (!prodMap[key]) {
      prodMap[key] = {
        nombre: key,
        grupo: v.grupo || "",
        categoria: v.categoria || "",
        ventas: 0,
        ingresos: 0,
      };
    }
    prodMap[key].ventas++;
    prodMap[key].ingresos += Number(v.precioFinal || 0);
  }
  const productosMasVendidos = Object.values(prodMap)
    .sort((a, b) => b.ventas - a.ventas || b.ingresos - a.ingresos)
    .slice(0, 8);

  // Clientes frecuentes
  const clienteMap = {};
  for (const v of lista) {
    const nombre = v.nombreCliente;
    if (!nombre || nombre === "Sin asignar") continue;
    if (!clienteMap[nombre]) {
      clienteMap[nombre] = { nombre, compras: 0, total: 0 };
    }
    clienteMap[nombre].compras++;
    clienteMap[nombre].total += Number(v.precioFinal || 0);
  }
  const clientesFrecuentes = Object.values(clienteMap)
    .sort((a, b) => b.compras - a.compras || b.total - a.total)
    .slice(0, 8);

  // Por categoría
  const catMap = {};
  for (const v of lista) {
    const cat = v.categoria || "Sin categoría";
    if (!catMap[cat]) catMap[cat] = { categoria: cat, ventas: 0, ingresos: 0 };
    catMap[cat].ventas++;
    catMap[cat].ingresos += Number(v.precioFinal || 0);
  }
  const porCategoria = Object.values(catMap).sort(
    (a, b) => b.ingresos - a.ingresos,
  );

  // Ventas recientes (10 más nuevas)
  const ventasRecientes = [...lista]
    .sort((a, b) => {
      const ta =
        typeof a.fechaVenta?.toDate === "function"
          ? a.fechaVenta.toDate().getTime()
          : new Date(a.fechaVenta || 0).getTime();
      const tb =
        typeof b.fechaVenta?.toDate === "function"
          ? b.fechaVenta.toDate().getTime()
          : new Date(b.fechaVenta || 0).getTime();
      return tb - ta;
    })
    .slice(0, 10);

  return {
    totalVentas,
    totalIngresos,
    clientesUnicos,
    ticketPromedio,
    productosMasVendidos,
    clientesFrecuentes,
    porCategoria,
    ventasRecientes,
  };
});

// ── Formatear fecha ───────────────────────────────────────────
const formatearFecha = (fecha) => {
  if (!fecha) return "Sin fecha";
  const d =
    typeof fecha?.toDate === "function" ? fecha.toDate() : new Date(fecha);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap");

.stats-page {
  min-height: 100vh;
  background: var(--cream, #fff8f5);
}

/* ══ HERO ══════════════════════════════════════════════════ */
.stats-hero {
  position: relative;
  padding: 120px 5vw 60px;
  text-align: center;
  overflow: hidden;
}
.stats-hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #fff8f5 0%, #fce4ec 60%, #fff 100%);
  z-index: 0;
}
.stats-hero__content {
  position: relative;
  z-index: 1;
  max-width: 600px;
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
.stats-hero h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.15;
  color: #1a1a1a;
  margin: 0;
}
.text-pink {
  color: #e91e8c;
}
.stats-hero p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* Selector período */
.periodo-selector {
  display: flex;
  background: #fff;
  border-radius: 50px;
  padding: 4px;
  gap: 4px;
  box-shadow: 0 4px 20px rgba(233, 30, 140, 0.1);
  border: 1.5px solid rgba(233, 30, 140, 0.12);
  margin-top: 8px;
}
.periodo-btn {
  padding: 9px 22px;
  border-radius: 50px;
  border: none;
  background: transparent;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.25s;
}
.periodo-btn.active {
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(233, 30, 140, 0.3);
}

/* ══ CONTENIDO ══════════════════════════════════════════════ */
.stats-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 100px;
}

/* Loading */
.loading-state {
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

/* ══ KPI GRID ═══════════════════════════════════════════════ */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}
.kpi-card {
  background: #fff;
  border-radius: 20px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1.5px solid rgba(233, 30, 140, 0.1);
  box-shadow: 0 4px 16px rgba(233, 30, 140, 0.07);
  transition:
    box-shadow 0.3s,
    transform 0.3s;
}
.kpi-card:hover {
  box-shadow: 0 8px 28px rgba(233, 30, 140, 0.13);
  transform: translateY(-2px);
}
.kpi-icon {
  font-size: 2rem;
  flex-shrink: 0;
}
.kpi-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.kpi-label {
  font-size: 0.72rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.kpi-value {
  font-family: "Playfair Display", serif;
  font-size: 1.35rem;
  color: #1a1a1a;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kpi-card--ingresos .kpi-value {
  color: #e91e8c;
}
.kpi-card--clientes .kpi-value {
  color: #7c3aed;
}
.kpi-card--ticket .kpi-value {
  color: #059669;
}

/* ══ STATS GRID (2 cols) ════════════════════════════════════ */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
.stats-card {
  background: #fff;
  border-radius: 22px;
  padding: 24px;
  border: 1.5px solid rgba(233, 30, 140, 0.1);
  box-shadow: 0 4px 16px rgba(233, 30, 140, 0.06);
}
.stats-card--full {
  margin-bottom: 20px;
}
.stats-card--full:last-child {
  margin-bottom: 0;
}
.stats-card__header {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 20px;
}
.stats-card__header h2 {
  font-family: "Playfair Display", serif;
  font-size: 1.15rem;
  color: #1a1a1a;
  margin: 0;
}
.stats-card__sub {
  font-size: 0.75rem;
  color: #aaa;
}

/* Empty */
.stats-empty {
  text-align: center;
  padding: 32px 16px;
  color: #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.stats-empty span {
  font-size: 2.5rem;
}
.stats-empty p {
  font-size: 0.88rem;
}

/* ── Ranking ─────────────────────────────────────────────── */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ranking-item {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  grid-template-rows: auto 6px;
  column-gap: 10px;
  row-gap: 4px;
  align-items: center;
}
.ranking-bar {
  grid-column: 2 / -1;
  height: 4px;
  background: rgba(233, 30, 140, 0.08);
  border-radius: 50px;
  overflow: hidden;
}
.ranking-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #f48fb1, #e91e8c);
  border-radius: 50px;
  transition: width 0.6s ease;
}
.ranking-pos {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1;
}
.ranking-pos--rest {
  font-size: 0.78rem;
  font-weight: 700;
  color: #bbb;
  font-family: "Playfair Display", serif;
}
.ranking-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.ranking-info strong {
  font-size: 0.88rem;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ranking-info span {
  font-size: 0.72rem;
  color: #aaa;
}
.ranking-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}
.ranking-count {
  font-size: 0.78rem;
  font-weight: 600;
  color: #e91e8c;
}
.ranking-monto {
  font-size: 0.72rem;
  color: #aaa;
}

/* ── Clientes ────────────────────────────────────────────── */
.clientes-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cliente-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(252, 228, 236, 0.2);
  border: 1px solid rgba(233, 30, 140, 0.07);
  transition: background 0.2s;
}
.cliente-item--top {
  background: rgba(233, 30, 140, 0.06);
  border-color: rgba(233, 30, 140, 0.18);
}
.cliente-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f48fb1, #e91e8c);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}
.cliente-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.cliente-info strong {
  font-size: 0.88rem;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cliente-info span {
  font-size: 0.72rem;
  color: #aaa;
}
.cliente-monto {
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  color: #e91e8c;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.cliente-monto span {
  font-family: "DM Sans", sans-serif;
  font-size: 0.65rem;
  color: #aaa;
  font-weight: 400;
}

/* ── Categorías ──────────────────────────────────────────── */
.categoria-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.categoria-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.categoria-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.categoria-emoji {
  font-size: 1.4rem;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
}
.categoria-header > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.categoria-header strong {
  font-size: 0.9rem;
  color: #1a1a1a;
}
.categoria-header span {
  font-size: 0.72rem;
  color: #aaa;
}
.categoria-monto {
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  color: #e91e8c;
}
.categoria-bar {
  height: 6px;
  background: rgba(233, 30, 140, 0.08);
  border-radius: 50px;
  overflow: hidden;
  margin-left: 42px;
}
.categoria-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #f48fb1, #e91e8c);
  border-radius: 50px;
  transition: width 0.6s ease;
}

/* ── Ventas recientes ────────────────────────────────────── */
.ventas-recientes {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.venta-reciente-item {
  display: grid;
  grid-template-columns: 48px 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(233, 30, 140, 0.06);
}
.venta-reciente-item:last-child {
  border-bottom: none;
}
.venta-reciente__img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(252, 228, 236, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}
.venta-reciente__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.venta-reciente__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.venta-reciente__info strong {
  font-size: 0.88rem;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.venta-reciente__info span {
  font-size: 0.72rem;
  color: #aaa;
}
.venta-reciente__cliente {
  font-size: 0.82rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.venta-reciente__monto {
  font-family: "Playfair Display", serif;
  font-size: 0.95rem;
  color: #e91e8c;
  font-weight: 700;
  white-space: nowrap;
}

/* ══ RESPONSIVE ════════════════════════════════════════════ */
@media (max-width: 900px) {
  .kpi-grid {
    grid-template-columns: 1fr 1fr;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-hero {
    padding: 80px 16px 40px;
  }
  .stats-hero h1 {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }
  .stats-content {
    padding: 24px 12px 80px;
  }
  .kpi-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .kpi-card {
    padding: 14px 14px;
    gap: 10px;
  }
  .kpi-icon {
    font-size: 1.6rem;
  }
  .kpi-value {
    font-size: 1.1rem;
  }
  .stats-card {
    padding: 18px 16px;
  }
  .venta-reciente-item {
    grid-template-columns: 40px 1fr auto;
  }
  .venta-reciente__cliente {
    display: none;
  }
  .periodo-btn {
    padding: 8px 16px;
    font-size: 0.82rem;
  }
}

@media (max-width: 380px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
