import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import CafePage from '../views/CafePage.vue'
import CriteriaPage from '../views/CriteriaPage.vue'
import YouAreSafePage from '../views/YouAreSafePage.vue'
import MapPage from '../views/MapPage.vue'
import ChattingPage from '../views/ChattingPage.vue'
import ChangePassFirstLogin from '@/views/ChangePassFirstLogin.vue'
const router = createRouter({
  history: createWebHistory(process.env.VITE_PUBLIC_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage // Trang Login sẽ là trang mặc định
    },
    {
      path: '/changePassFirstLogin',
      name: 'ChangePassFirstLogin',
      component: ChangePassFirstLogin // Trang Login sẽ là trang mặc định
    },
    {
      path: '/registerPage',
      name: 'Register',
      component: RegisterPage // Trang Login sẽ là trang mặc định
    },
    {
      path: '/youAreSafePage',
      name: 'youAreSafePage',
      component: YouAreSafePage
    },
    {
      path: '/chattingPage',
      name: 'chattingPage',
      component: ChattingPage
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/cafePage',
      name: 'cafePage',
      component: CafePage
    },
    {
      path: '/criteriaPage',
      name: 'criteriaPage',
      component: CriteriaPage
    },
    {
      path: '/mapPage',
      name: 'mapPage',
      component: MapPage
    }
    
  ]
})

export default router
