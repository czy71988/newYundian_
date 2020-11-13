import router from './index'
import { getToken } from '../utils/auth'

const whiteList = ['/login', '/changeEnv', '/reg']
const isInWhiteList = (path) => {
  for (let i = 0, len = whiteList.length; i < len; i++) {
    if (path.indexOf(whiteList[i]) > -1) {
      return true
    }
  }
  return false
}

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (isInWhiteList(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})
