import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

import HomeView   from '../views/HomeView.vue'
import StockView  from '../views/StockView.vue'
import LegalView  from '../views/LegalView.vue'
import PagosView  from '../views/PagosView.vue'
import LoginView  from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import MisApartadosView from '../views/MisApartadosView.vue'


const routes = [
  { path: '/',       redirect: '/home' },
  { path: '/home',   component: HomeView  },
  { path: '/stock',  component: StockView },
  { path: '/pagos',  component: PagosView },
  { path: '/legal',  component: LegalView },
  
  //-─ Mis Apartados — requiere sesión ─────────────────────────
  {
  path: '/mis-apartados',
  component: MisApartadosView,
  meta: { requiereAuth: true }
  },

  // ── Auth — si ya hay sesión, redirige al home ──────────────
  {
    path: '/login',
    component: LoginView,
    meta: { soloSinSesion: true }
  },
  {
    path: '/signup',
    component: SignUpView,
    meta: { soloSinSesion: true }
  },

  // ── 404 ───────────────────────────────────────────────────
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

// ── Guard global ──────────────────────────────────────────────
router.beforeEach((to, from, next) => {
  const usuario = auth.currentUser

  if (to.meta.soloSinSesion && usuario) {
    return next('/home')
  }

  // ← Nuevo: rutas que requieren estar logueado
  if (to.meta.requiereAuth && !usuario) {
    return next('/login')
  }

  next()
})

export default router