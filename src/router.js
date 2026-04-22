import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import StockView from './views/StockView.vue'
import LegalView from './views/LegalView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/stock', component: StockView },
  { path: '/legal', component: LegalView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router