import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

import HomeView        from "../views/HomeView.vue";
import StockView       from "../views/StockView.vue";
import LegalView       from "../views/LegalView.vue";
import PagosView       from "../views/PagosView.vue";
import LoginView       from "../views/LoginView.vue";
import SignUpView      from "../views/SignUpView.vue";
import MisApartadosView from "../views/MisApartadosView.vue";
import VentasView      from "../views/VentasView.vue";
import NotFoundView    from "../views/NotFoundView.vue";
import MaintenanceView from "../views/MaintenanceView.vue";

const routes = [
  { path: "/",             redirect: "/home" },
  { path: "/home",         component: HomeView },
  { path: "/stock",        component: StockView },
  { path: "/pagos",        component: PagosView },
  { path: "/legal",        component: LegalView },
  { path: "/maintenance",  component: MaintenanceView },
  {
    path: "/mis-apartados",
    component: MisApartadosView,
    meta: { requiereAuth: true },
  },
  {
    path: "/mis-compras",
    component: VentasView,
    meta: { requiereAuth: true },
  },
  {
    path: "/ventas",        
    component: VentasView,
    meta: { requiereAuth: true },
  },
  { path: "/login",  component: LoginView,  meta: { soloSinSesion: true } },
  { path: "/signup", component: SignUpView, meta: { soloSinSesion: true } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

// ── Guard con espera a Firebase Auth ─────────────────────────
let authListo = false;

const esperarAuth = () =>
  new Promise((resolve) => {
    if (authListo) return resolve(auth.currentUser);
    const unsub = auth.onAuthStateChanged((user) => {
      authListo = true;
      unsub();
      resolve(user);
    });
  });

router.beforeEach(async (to, from, next) => {
  const usuario = await esperarAuth();

  if (to.meta.soloSinSesion && usuario) return next("/home");
  if (to.meta.requiereAuth  && !usuario) return next("/login");
  next();
});

export default router;