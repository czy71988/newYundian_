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
    baseUrl: '',
    uploadUrl: 'https://test.zk020.cn/bee-admin/admin/systemIndex/doUploadFile'
  },
  pre: {
    baseUrl: 'https://test.zk020.cn',
    uploadUrl: 'https://test.zk020.cn/bee-admin/admin/systemIndex/doUploadFile'
  },
  pro: {
    baseUrl: 'https://bee.zk020.cn',
    uploadUrl: 'https://bee.zk020.cn/bee-admin/admin/systemIndex/doUploadFile'
  }
}
export const reqConfig = reqConfigMap[env]
