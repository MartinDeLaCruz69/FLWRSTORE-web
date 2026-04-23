import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import StockView   from '../views/StockView.vue'
import LegalView   from '../views/LegalView.vue'
import PagosView   from '../views/PagosView.vue'
import LoginView   from '../views/LoginView.vue'   
import SignUpView  from '../views/SignUpView.vue' 

const routes = [
  { path: '/',        component: HomeView   },
  { path: '/home',    component: HomeView   },
  { path: '/stock',   component: StockView  },
  { path: '/legal',   component: LegalView  },
  { path: '/pagos',   component: PagosView  },
  { path: '/login',   component: LoginView  }, 
  { path: '/signup',  component: SignUpView  }, 
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})