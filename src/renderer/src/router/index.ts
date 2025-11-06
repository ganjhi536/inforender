import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'file',
    component: () => import('../views/MainPart.vue') // 软路由加载（懒加载）
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Aboutview.vue') // 软路由加载（懒加载）
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue') // 软路由加载（懒加载）
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue') // 软路由加载（懒加载）
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 添加前置路由守卫
router.beforeEach((to, from, next) => {
  console.log(`from: ${JSON.stringify(from)},                   to: ${JSON.stringify(to)}`) // 打印路由跳转信息
  next() // 一定要调用 next() 方法，否则路由不会跳转
})

export default router
