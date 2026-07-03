import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import StockView from "./views/StockView.vue";
import PagosView from "./views/PagosView.vue";
import LegalView from "./views/LegalView.vue";
import LoginView from "./views/LoginView.vue";
import SignUpView from "./views/SignUpView.vue";
import MisApartadosView from "./views/MisApartadosView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import MaintenanceView from "./views/MaintenanceView.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomeView },
  { path: "/stock", component: StockView },
  { path: "/pagos", component: PagosView },
  { path: "/legal", component: LegalView },
  { path: "/login", component: LoginView },
  { path: "/signup", component: SignUpView },
  { path: "/mis-apartados", component: MisApartadosView },
  { path: "/maintenance", component: MaintenanceView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
