import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import index from './pages/index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/index/wangpan',
        name: 'wangpan',
        component: () => import('./pages/content/wangpan.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
    },
    component: () => import('./pages/login.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
