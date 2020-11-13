const routes = [

  {
    path: '/businessShopList',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/business/businessShops/businessShopList.vue')
  },
  {
    path: '/Financialsettlement',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/business/Finance/Financialsettlement.vue')
  }
]

export default routes
