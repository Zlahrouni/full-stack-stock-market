import { createRouter, createWebHistory } from 'vue-router'

import MyView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CompanyView from "@/views/CompanyView.vue";
import SignUpView from "@/views/authview/SignUpView.vue";
import LogInView from "@/views/authview/LogInView.vue";
import store from "@/store";
import FavoriteView from "@/views/FavoriteView.vue";
import {toast} from "vue3-toastify";

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
      path: '/company/:symbol',
      name: 'company',
      component: CompanyView,
      meta: { requiresAuth: true },
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
      path: '/favorites',
      name: 'favorites',
      component: FavoriteView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  // Ensure the token is in sync with the store
  const token = store.getters.getToken;
  if (typeof token !== 'undefined') {
    await store.commit('setToken', { token: token });
  } else {
    await store.dispatch('clear');
  }

  // Call the getLogged action before navigating to any route
  await store.dispatch('getLogged');

  // Get the logged value from the store
  const isLogged = store.getters.isLogged;
  const username = store.getters.getUsername;

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If user is not logged in, redirect to login page
    if (!isLogged) {
      next({ name: 'login' });
    } else {
      // If there's a specific username in the route, check if it matches the logged-in user
      if (to.params.username && to.params.username !== username) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  } else if(to.name === 'login' && isLogged || to.name === 'signup' && isLogged) {
    next({ name: 'home' });
  } else {
    // Continue with the navigation for routes that don't require authentication
    next();
  }
});

export default router
