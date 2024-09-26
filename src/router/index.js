import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import CafePage from '../views/CafePage.vue'
import CriteriaPage from '../views/CriteriaPage.vue'
import YouAreSafePage from '../views/YouAreSafePage.vue'

const router = createRouter({
  history: createWebHistory(process.env.VITE_PUBLIC_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage // Trang Login sẽ là trang mặc định
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
      path: '/youAreSafePage',
      name: 'youAreSafePage',
      component: YouAreSafePage
    }
    
  ]
})

export default router
