import { createRouter, createWebHistory } from 'vue-router'

import MyView from "@/views/MyView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CompanyView from "@/views/CompanyView.vue";
import SignUpView from "@/views/authview/SignUpView.vue";
import LogInView from "@/views/authview/LogInView.vue";

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
    },
    {
      path: '/:symbol',
      name: 'company',
      component: CompanyView,
    },
    {
        path: '/login',
        name: 'login',
        component: LogInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
