
import request from '../utils/request'

// 登录接口
export function yundianLogin (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/user/login',
    data
  }, catchConfig)
  return req
}

// 获取手机验证码
export function yundianmoke (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/user/sendCode',
    data
  }, catchConfig)
  return req
}
