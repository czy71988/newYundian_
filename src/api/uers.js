
import request from '../utils/request'

// 用户列表
export function UserList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/user/info/query/page',
    data
  }, catchConfig)
  return req
}

// 启用禁用
export function UserListDisable (data, catchConfig) {
  const req = request({
    method: 'POST',
    url: '/youmi-fresh/admin/user/info/update',
    data
  }, catchConfig)
  return req
}
