import { createRouter, createWebHistory } from 'vue-router'
import index from './pages/index.vue'
const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: index,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
    },
    component: () => import('./pages/login.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
