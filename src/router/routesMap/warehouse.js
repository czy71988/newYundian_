const routes = [

  {
    path: '/caiwu',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/caiwu.vue')
  },
  {
    path: '/shop',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/shop.vue')
  },
  {
    path: '/mendianguanli',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/wangdain/mendianguanli.vue')
  },
  {
    path: '/wangidangunali',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/wangdain/wangidangunali.vue')
  },
  {
    path: '/dinghuoorder',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/dingdan/dinghuoorder.vue')
  },
  {
    path: '/order',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/dingdan/order.vue')
  },
  {
    path: '/orders',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/warehouseRole/dingdan/orders.vue')
  }
]

export default routes
