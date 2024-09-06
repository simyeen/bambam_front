import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login';

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

    { path: '/param/:id', name: 'param', component: () => import('../views/ParamView.vue') }
  ]
});

export default router;
