import { createRouter, createWebHistory } from 'vue-router'

import MyView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CompanyView from "@/views/CompanyView.vue";
import SignUpView from "@/views/authview/SignUpView.vue";
import LogInView from "@/views/authview/LogInView.vue";
import store from "@/store";
import {getCookie} from "@/utils/coockies.utils";

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
router.beforeEach(async (to, from, next) => {
  let token = getCookie("token");
  if(typeof token !== 'undefined') {
    await store.commit('setToken', {token: token});
  } else {
    await store.dispatch('clear');
  }
  // Call the getLogged action before navigating to any route
  await store.dispatch('getLogged');

  // Get the logged value from the store
  const isLogged = store.getters.isLogged;

  // Check if we going to login or signup route
    if (to.name === 'login' || to.name === 'signup') {
        // If user is logged in we redirect it to home page
        if (isLogged) {
        next({ name: 'home' });
        return;
        } else {
          next();
          return;
        }
    } else {
      // Continue with the navigation
      next();
      return;
    }


});
export default router
