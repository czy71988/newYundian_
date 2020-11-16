import user from './modules/user'
import Vue from 'vue'
import Vuex from 'vuex'
import routesMap from '../router/routesMap'
// import { getMenusByRoutes } from '../utils/menu'
import router from '../router'
import { setToken } from '../utils/auth'
import { yundianLogin } from '../api/login'
import order from './modules/order'
Vue.use(Vuex)

const state = {
  env: localStorage.getItem('ym_env'),
  menus: [],
  role: ''
}

const mutations = {
  UPDATE_ENV (state, data) {
    state.env = data
    localStorage.setItem('ym_env', data)
  },
  UPDATE_MENUS (state, data) {
    state.menus = data
  },
  update_role (state, data) {
    state.role = data
  }
}

const getters = {
  envName (state) {
    return state.env === 'pre' ? '测试' : '正式'
  }
}

const actions = {
  login ({ commit }, data = {}) {
    yundianLogin({
      phone: data.phone,
      identifyCode: data.identifyCode
    }).then(data => {
      console.log(data)
      sessionStorage.setItem('uers', data.phone)
      sessionStorage.setItem('id', data.shopId)
      const roleMap = {
        0: 'admin', // 运营账号
        1: 'business', // 商家账号
        2: 'warehouse', // 中心仓账号
        3: 'outlets', // 网点用户
        4: 'store' // 门店用户
      }
      const role = roleMap[data.roleType]
      data.role = role
      const routes = routesMap[role]
      router.addRoutes(routes)
      commit('update_role', role)
      setToken(data.token)
      router.push('/')
      // const menus = getMenusByRoutes(routes)
    })
  }
}

export default new Vuex.Store({
  modules: {
    user,
    order
  },
  state,
  getters,
  mutations,
  actions
})
