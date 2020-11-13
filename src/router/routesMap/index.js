import admin from './admin'
import store from './store'
import business from './business'
import index from '@/views/index.vue'
import outlets from './Outlets'
import warehouseRole from './warehouse'

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
  store: formatRoutes(store, '/home'),
  business: formatRoutes(business, '/businessShopList'),
  outlets: formatRoutes(outlets, '/OutletsOrder'),
  warehouse: formatRoutes(warehouseRole, '/wangidangunali')
}

export default routesMap
