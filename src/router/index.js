import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login';
import Dash from '@/components/DashboardLayout.vue';
import DashboardLayout from '@/components/DashboardLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/pages/Home')
    },
    {
      path: '/reptile',
      name: 'reptile',
      component: () => import('../components/pages/Reptile')
    },
    {
      path: '/dash',
      name: 'dash',
      // component: Dash
      // component: () => import('../components/pages/Home/HomeContainer.vue')
      component: () => import('../components/pages/Home/DashboardLayout.vue')
    },

    { path: '/param/:id', name: 'param', component: () => import('../views/ParamView.vue') }
  ]
});

export default router;
