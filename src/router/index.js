import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
// import shopList from '@/components/adminRole/shop/shopList.vue'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/changeEnv',
    name: 'ChangeEnv',
    component: () => import('@/views/changeEnv/index.vue')
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// reset router
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
