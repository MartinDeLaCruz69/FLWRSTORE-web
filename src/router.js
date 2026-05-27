import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import StockView from "./views/StockView.vue";
import PagosView from "./views/PagosView.vue";
import LegalView from "./views/LegalView.vue";
import LoginView from "./views/LoginView.vue";
import SignUpView from "./views/SignUpView.vue";
import MisApartadosView from "./views/MisApartadosView.vue";
import NotFoundView from "./views/NotFoundView.vue"; 
import ComingSoonView from './views/ComingSoonView.vue'


const routes = [
  { path: "/", component: ComingSoonView },
  { path: "/home", component: ComingSoonView },
  { path: "/stock", component: ComingSoonView },
  { path: "/pagos", component: ComingSoonView },
  { path: "/legal", component: ComingSoonView },
  { path: "/login", component: ComingSoonView },
  { path: "/signup", component: ComingSoonView },
  { path: "/mis-apartados", component: ComingSoonView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
