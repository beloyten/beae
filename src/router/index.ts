import BasicLayout from "@/components/layouts/BasicLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { path: "/gallery" },
    },
    {
      path: "/gallery",
      component: BasicLayout,
      meta: { title: "Gallery" },
      children: [
        {
          name: "Gallery",
          path: "",
          component: () => import("@/views/Gallery.vue")
        },
      ],
    },
    {
      path: "/form-contact",
      component: BasicLayout,
      meta: { title: "Form Contact" },
      children: [
        {
          name: "Form Contact",
          path: "",
          component: () => import("@/views/FormContact.vue")
        },
      ],
    },
    {
      path: "/swiper-slider",
      component: BasicLayout,
      meta: { title: "Swiper Slider" },
      children: [
        {
          name: "Swiper Slider",
          path: "",
          component: () => import("@/views/SwiperSlider.vue")
        },
      ],
    },
    {
      path: "/component-form",
      component: BasicLayout,
      meta: { title: "Component Form" },
      children: [
        {
          name: "Component Form",
          path: "",
          component: () => import("@/views/ComponentForm.vue")
        },
      ],
    },
    {
      path: "/products-collection",
      component: BasicLayout,
      meta: { title: "Products Collection" },
      children: [
        {
          name: "Products Collection",
          path: "",
          component: () => import("@/views/ProductsCollection.vue")
        },
      ],
    },
  ],
});

export default router
