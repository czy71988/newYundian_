import user from './modules/user'
import Vue from 'vue'
import Vuex from 'vuex'
import routesMap from '../router/routesMap'
<<<<<<< HEAD
// import { getMenusByRoutes } from '../utils/menu'
import router from '../router'
import { setToken } from '../utils/auth'
import { yundianLogin } from '../api/login'
=======
import { getMenusByRoutes } from '../utils/menu'
import router from '../router'
import { setToken } from '../utils/auth'
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
Vue.use(Vuex)

const state = {
  env: localStorage.getItem('ym_env'),
<<<<<<< HEAD
  menus: [],
  role: ''
=======
  menus: []
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
}

const mutations = {
  UPDATE_ENV (state, data) {
    state.env = data
    localStorage.setItem('ym_env', data)
  },
  UPDATE_MENUS (state, data) {
    state.menus = data
<<<<<<< HEAD
  },
  update_role (state, data) {
    state.role = data
=======
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  }
}

const getters = {
  envName (state) {
    return state.env === 'pre' ? '测试' : '正式'
  }
}

const actions = {
  login ({ commit }, data = {}) {
<<<<<<< HEAD
    yundianLogin({
      phone: data.phone,
      identifyCode: data.identifyCode
    }).then(data => {
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
=======
    const { phone } = data
    const routes = routesMap[phone]
    const menus = getMenusByRoutes(routes)
    router.addRoutes(routes)
    setToken(phone || Date.now())
    router.push({ name: 'index' })
    commit('UPDATE_MENUS', menus)
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  }
}

export default new Vuex.Store({
  modules: {
    user
  },
  state,
  getters,
  mutations,
  actions
})
