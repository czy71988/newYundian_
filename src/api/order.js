
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
    data,
    responseType: 'blob'
  }, catchConfig)
  return req
}

// 确认收货 /youmi-fresh/apiUser/order/confirmOrderReceiptNew
export function orderConfirmReceipt (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/apiUser/order/confirmOrderReceiptNew',
    data
  }, catchConfig)
  return req
}

// 运营后台财务列表
export function SettlementApplication (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/settle/getFinanceApplyInfo',
    data
  }, catchConfig)
  return req
}

// 运营后台财务-通过审核
export function SettlementApplicationOut (data, catchConfig) {
  const req = request({
    method: 'POST',
    url: '/youmi-fresh/admin/settle/applyUpdateStatusAdopt',
    data
  }, catchConfig)
  return req
}

// 运营后台财务-拒绝审核
export function SettlementApplicationReOut (data, catchConfig) {
  const req = request({
    method: 'POST',
    url: '/youmi-fresh/admin/settle/applyUpdateStatusFail',
    data
  }, catchConfig)
  return req
}

// 运营后台财务-上传凭证
export function UploadVoucher (data, catchConfig) {
  const req = request({
    method: 'POST',
    url: '/youmi-fresh/admin/settle/auditApplyOperation',
    data
  }, catchConfig)
  return req
}
