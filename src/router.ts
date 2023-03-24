import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import index from './pages/index.vue';
import { Message } from 'view-ui-plus';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/index/wangpan' },
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
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');
  // 已经登录
  if (user && token?.length !== 0) {
    // 防止重复登录
    if (to.path === '/login') {
      Message.error('禁止重复登录');
      return next({ path: (from.path as string) ? (from.path as string) : '/index/wangpan' });
    }
    next();
  }
  // 未登录
  else {
    if (to.path !== '/login') {
      Message.error('未登录禁止访问');
      next({ path: '/login' });
    }
    next();
  }
});
export default router;
