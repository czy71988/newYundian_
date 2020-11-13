import Cookie from 'js-cookie'
// const tokenKey = 'ztyc' + Date.now()
const TOKEN_KEY = 'ztyc123456'
export function setToken (token) {
  return Cookie.set(TOKEN_KEY, token)
}

export function getToken () {
  return Cookie.get(TOKEN_KEY)
}

export function removeToken () {
  return Cookie.remove(TOKEN_KEY)
}
removeToken()
