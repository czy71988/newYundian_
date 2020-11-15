// 门店管理
const routes = [
  { path: '/home', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/home/home.vue') },
  { path: '/Selfdeliveryorder', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/order/Selfdeliveryorder.vue') },
  { path: '/Deliveryorder', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/order/Deliveryorder.vue') },
  { path: '/Order', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/order/Order.vue') },
  { path: '/DeliverySOrder', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/order/DeliverySOrder.vue') },
  { path: '/ProductList', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/shop/ProductList.vue') }
  // { path: '/FinancialSettlement', component: () => import(/* webpackChunkName: "storeRole" */ '@/components/storeRole/Financial/FinancialSettlement.vue') }
]

export default routes
