import { createRouter, createWebHistory } from 'vue-router'
// Importamos las vistas (asegúrate de crear estos archivos en la carpeta views)
import HomeView from '../views/HomeView.vue'
import StockView from '../views/StockView.vue'
import PagosView from '../views/PagosView.vue'
import PerfilView from '../views/PerfilView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/stock',
    name: 'stock',
    component: StockView
  },
  {
    path: '/pagos',
    name: 'pagos',
    component: PagosView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router