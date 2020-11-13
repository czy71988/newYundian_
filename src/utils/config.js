export const mapConfig = {
  key: 'VMKBZ-7MEWD-66F45-HDQ5D-O6FIZ-3IFTI',
  baseUrl: 'https://apis.map.qq.com'
}

let env = 'pre'
if (process.env.NODE_ENV !== 'development') {
  env = (localStorage.getItem('ym_env') === 'pre' ? 'pre' : 'pro')
}
const reqConfigMap = {
  dev: {
    baseUrl: ''
  },
  pre: {
    baseUrl: 'https://test.zk020.cn'
  },
  pro: {
    baseUrl: 'https://bee.zk020.cn'
  }
}
export const reqConfig = reqConfigMap[env]
