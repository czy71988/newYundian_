
import request from '../utils/request'

// 类目列表
export function InterfaceBanner (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/banner/query/page',
    data
  }, catchConfig)
  return req
}

// 添加BANNER
export function InterfaceAddBanner (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/banner/add',
    data
  }, catchConfig)
  return req
}

// 修改BANNER
export function InterfaceUpdateBanner (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/banner/update',
    data
  }, catchConfig)
  return req
}
