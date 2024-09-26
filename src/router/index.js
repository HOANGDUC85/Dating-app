import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(process.env.VITE_PUBLIC_BASE_URL),
  routes: [
    {
      path: '/homePage',
      name: 'homePage',
      component: LoginPage
    }
    
  ]
})

export default router
