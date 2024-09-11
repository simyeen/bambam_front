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
      path: '/reptile/:id',
      name: 'reptile',
      component: () => import('../components/pages/Reptile')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../components/pages/Add')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../components/pages/Chart')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../components/pages/Calendar')
    }
  ]
});

export default router;
