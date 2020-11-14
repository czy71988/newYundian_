
import request from '../utils/request'

// 店铺列表
export function InterfaceShop (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/shop/query/page',
    data
  }, catchConfig)
  return req
}

// 获取下拉列表
export function InterfaceDropdownList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/shop/getList',
    data
  }, catchConfig)
  return req
}

// 获取下拉列表
export function InterfaceDropdownlastList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/shop/getChilds',
    data
  }, catchConfig)
  return req
}

// 添加店铺
export function InterfaceAddShop (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/shop/add',
    data
  }, catchConfig)
  return req
}

// 修改店铺 /youmi-fresh/admin/shop/update
export function InterfaceUpShop (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/shop/update',
    data
  }, catchConfig)
  return req
}

// 财务
export function InterfaceFinance (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/settle/getBusinessFinance',
    data
  }, catchConfig)
  return req
}

// 商家财务申请结算
export function settlementstore (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/settle/applySettlement',
    data
  }, catchConfig)
  return req
}

// 商家财务申请列表
export function SettlementListstore (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/settle/getBusinessApplyInfo',
    data
  }, catchConfig)
  return req
}

// 商家财务修改
export function SettlementUpdate (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/settle/updateApplySettlement',
    data
  }, catchConfig)
  return req
}

// 门店、网点、中心收益信息
export function SettlementStoreRevenue (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/settle/queryProfitInfo',
    data
  }, catchConfig)
  return req
}

// 分佣信息
export function SubCommissionInformation (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/settle/querySettingPro',
    data
  }, catchConfig)
  return req
}
