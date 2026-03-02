import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/ViewHome.vue'),
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/DashboardHome.vue'),
    },
  ],
})

export default router
