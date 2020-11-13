const routes = [

  {
    path: '/OutletsOrder',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/OutletsRole/OutletsOrder.vue')
  },
  {
    path: '/OutletsOrders',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/OutletsRole/OutletsOrders.vue')
  },
  {
    path: '/OutletsHouse',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/OutletsRole/OutletsHouse.vue')
  },
  {
    path: '/OutletsShop',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/OutletsRole/OutletsShop.vue')
  },
  {
    path: '/OutletsFinance',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/OutletsRole/OutletsFinance.vue')
  },
  {
    path: '/Commodi',
    name: 'Commodi',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/shop/Commodi.vue')
  }
]

export default routes
