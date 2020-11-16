import axios from 'axios'
import { Message } from 'element-ui'
import { reqConfig } from './config'
import { getToken } from '../utils/auth'
// import baseURL from '../../vue.config'
// import { MessageBox } from 'element-ui'

// const baseURL = 'http://test.bee.zk020.cn/youmi-fresh'

// 创建axios实例
const service = axios.create({
  timeout: 60000
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8'
  // }
})

// 请求拦截
service.interceptors.request.use(config => {
  config.baseURL = reqConfig.baseUrl
  config.headers = {
    token: getToken()
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use(res => {
  const data = res.data
  if (data.code !== 200) {
    if (data.message === '未登录') {
      this.$route.push({ name: 'login' })
    }
    return Promise.reject(new Error(data.message))
  }
  return data.data
}, err => {
  return Promise.reject(err)
})

// 统一请求的数据封装在config的data项
// 对post请求头默认添加token(若存在token且authToken为true)
// 第二参数catchConfig：[boolean, object]
//    类型为boolean,默认为true开启错误提示，false关闭
//    类型为object, 则根据配置项开启提示
// 开发环境不是以url中api/开头的，需要再url前加temp/，进行代理，解决跨域问题
// const IS_DEVLOPMENT_ENV = process.env.NODE_ENV === 'development'
const request = (config = {}, catchConfig) => {
  // 开发环境不是以url中api/开头的，需要再url前加temp/，进行代理，解决跨域问题
  // if (IS_DEVLOPMENT_ENV && config.url.indexOf('api/') < 0 && config.url.indexOf('temp/') < 0) {
  //   config.url = 'temp/' + config.url
  // }

  const method = config.method || 'post'
  // if (!config.header.token && config.authToken === true) {
  //   if (method.toLowerCase() === 'post') { // 给post请求默认添加token
  //     if (token) {
  //       config.header.token = token
  //     }
  //   }
  // }
  if (method.toLowerCase() === 'get' && !config.params) { // 将get请求的data赋值给params
    config.params = config.data
    config.data = {}
  }
  const promise = new Promise((resolve, reject) => {
    service(config).then(data => {
      resolve(data)
    }).catch((err) => {
      reject(err)
      if (catchConfig === false) {
        return
      }
      Message({
        showClose: true,
        message: err.message,
        type: 'error'
      })
    })
  })
  return promise
}

export default request
