import { createRouter, createWebHistory } from "vue-router";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

import HomeView from "../views/HomeView.vue";
import StockView from "../views/StockView.vue";
import LegalView from "../views/LegalView.vue";
import PagosView from "../views/PagosView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import MisApartadosView from "../views/MisApartadosView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import MaintenanceView from "../views/MaintenanceView.vue";

const routes = [
  { path: "/", redirect: "/maintenance" },
  { path: "/home", component: MaintenanceView },
  { path: "/stock", component: MaintenanceView },
  { path: "/pagos", component: PagosView },
  { path: "/legal", component: LegalView },
  { path: "/maintenance", component: MaintenanceView },
  {
    path: "/mis-apartados",
    component: MisApartadosView,
    meta: { requiereAuth: true },
  },
  { path: "/login", component: LoginView, meta: { soloSinSesion: true } },
  { path: "/signup", component: SignUpView, meta: { soloSinSesion: true } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

router.beforeEach((to, from, next) => {
  const usuario = auth.currentUser;
  if (to.meta.soloSinSesion && usuario) {
    return next("/home");
  }
  if (to.meta.requiereAuth && !usuario) {
    return next("/login");
  }
  next();
});

export default router;
