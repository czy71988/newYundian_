
// 运营后台路由
const routes = [
  {
    path: '/uers',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/uers/uers.vue'),
    meta: {
      menu: '用户管理,用户管理'
    }
  },
  {
    path: '/BANNER',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/AdvertisingSettings/banner.vue'),
    meta: {
      menu: '广告配置,用户管理'
    }
  },
  {
    path: '/advertising',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/AdvertisingSettings/advertising.vue'),
    meta: {
      menu: '广告配置,类目ICON配置'
    }
  },
  {
    path: '/shopList',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/shop/shopList.vue')
  },
  {
    path: '/shopType',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/shop/shopType.vue')
  },
  {
    path: '/mendian',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/xitongshezhi/mendian.vue')
  },
  {
    path: '/wangidan',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/xitongshezhi/wangidan.vue')
  },
  {
    path: '/zhongxin',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/xitongshezhi/zhongxin.vue')
  },
  {
    path: '/uersorder',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/order/uersorder.vue')
  },

  {
    path: '/peisongSorder',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/order/peisongSorder.vue')
  },
  {
    path: '/orderList',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/order/orderList.vue')
  },
  {
    path: '/ordergoods',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/order/ordergoods.vue')
  },
  {
    path: '/Commodi',
    name: 'Commodi',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/shop/Commodi.vue')
<<<<<<< HEAD
  },
  {
    path: '/ShopStoer',
    name: 'ShopStoer',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/xitongshezhi/ShopStoer.vue')
  },
  {
    path: '/Commission',
    name: 'Commission',
    component: () => import(/* webpackChunkName: "adminRole" */ '@/components/adminRole/xitongshezhi/Commission.vue')
=======
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  }
]

export default routes
