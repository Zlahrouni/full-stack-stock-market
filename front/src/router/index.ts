import { createRouter, createWebHistory } from 'vue-router'

import MyView from "@/views/MyView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router