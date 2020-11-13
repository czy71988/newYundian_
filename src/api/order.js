
import request from '../utils/request'

// 订单列表
export function InterfaceOrderList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/order/adminFindOrderInfo',
    data
  }, catchConfig)
  return req
}

// 订单查询接口
export function InterfaceQueryOrderList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/order/adminFindOrderDetailInfo',
    data
  }, catchConfig)
  return req
}

// 创建拨货订单
export function InterfaceNewOrderList (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/order/confirmDeliveryOrder',
    data
  }, catchConfig)
  return req
}

// 删除
export function InterfaceShopRemove (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/purchase/remove',
    data
  }, catchConfig)
  return req
}

// 订单导出
export function Interfaceorderexport (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/order/adminExcelOrderInfo',
    data
  }, catchConfig)
  return req
}
