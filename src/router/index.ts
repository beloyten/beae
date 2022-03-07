import BasicLayout from '@/components/layouts/BasicLayout.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/gallery' },
    },
    {
      path: '/gallery',
      component: BasicLayout,
      meta: { title: 'Gallery' },
      children: [
        {
          name: 'Gallery',
          path: '',
          component: () => import("@/views/Gallery.vue")
        }
      ]
    }
  ]
})

export default router
