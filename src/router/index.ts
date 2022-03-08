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
    },
    {
      path: '/form-contact',
      component: BasicLayout,
      meta: { title: 'Form Contact' },
      children: [
        {
          name: 'Form Contact',
          path: '',
          component: () => import("@/views/FormContact.vue")
        }
      ]
    }
  ]
})

export default router
