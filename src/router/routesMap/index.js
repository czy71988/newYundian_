import admin from './admin'
import store from './store'
<<<<<<< HEAD
import business from './business'
import index from '@/views/index.vue'
import outlets from './Outlets'
import warehouseRole from './warehouse'
=======
import index from '@/views/index.vue'
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293

const formatRoutes = (routes, redirect) => {
  return [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: redirect,
      children: routes
    }
  ]
}
const routesMap = {
  admin: formatRoutes(admin, '/shopList'),
<<<<<<< HEAD
  store: formatRoutes(store, '/home'),
  business: formatRoutes(business, '/businessShopList'),
  outlets: formatRoutes(outlets, '/OutletsOrder'),
  warehouse: formatRoutes(warehouseRole, '/wangidangunali')
=======
  store: formatRoutes(store, '/home')
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
}

export default routesMap
