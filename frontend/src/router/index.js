import { createRouter, createWebHistory } from 'vue-router'
import LayoutBase from '@/components/layout/LayoutBase.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutBase,
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/ViewHome.vue'),
        },
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('@/views/DashboardHome.vue'),
        },
        {
          name: 'comparison',
          path: 'comparison',
          component: () => import('@/views/ViewComparison.vue'),
        },
        {
          name: 'report',
          path: 'report',
          component: () => import('@/views/ViewReport.vue'),
        },
        {
          name: 'commercial-dashboard',
          path: 'commercial',
          component: () => import('@/views/commercial/CommercialDashboard.vue'),
        },
        {
          name: 'commercial-list',
          path: 'commercial/list',
          component: () => import('@/views/commercial/CommercialList.vue'),
        },
        {
          name: 'commercial-detail',
          path: 'commercial/:id',
          component: () => import('@/views/commercial/CommercialDetail.vue'),
        },
      ],
    },
  ],
})

export default router
