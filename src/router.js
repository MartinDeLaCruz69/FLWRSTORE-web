import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import StockView from './views/StockView.vue'
import PagosView from './views/PagosView.vue'
import LegalView from './views/LegalView.vue'
import LoginView from './views/LoginView.vue'
import SignUpView from './views/SignUpView.vue'

const routes = [
  { path: '/home', component: HomeView },
  { path: '/stock', component: StockView },
  { path: '/pagos', component: PagosView },
  { path: '/legal', component: LegalView },
  { path: '/login', component: LoginView }, // Carga perezosa
  { path: '/signup', component: SignUpView } // Carga perezosa
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router