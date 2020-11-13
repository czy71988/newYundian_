
import request from '../utils/request'

// 类目列表
export function InterfaceCommodity (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'youmi-fresh/admin/category/query/page',
    data
  }, catchConfig)
  return req
}

// 添加类目
export function InterfaceAddCategory (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/category/add',
    data
  }, catchConfig)
  return req
}

// 修改类目
export function InterfaceUpCategory (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/category/update',
    data
  }, catchConfig)
  return req
}

// 商品列表
export function InterfaceshopSohp (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/product/query/page',
    data
  }, catchConfig)
  return req
}

// 商品详情-
export function Interfaceshopdetails (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/product/get',
    data
  }, catchConfig)
  return req
}

// 商品添加
export function InterfaceAddshopdetails (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/product/add',
    data
  }, catchConfig)
  return req
}

// 商品上下架
export function InterfaceGoodsShelves (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/product/release',
    data
  }, catchConfig)
  return req
}

// 商品修改
export function InterfaceGoodsUpdate (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/youmi-fresh/admin/product/update',
    data
  }, catchConfig)
  return req
}

// 商品类目获取
export function InterfaceGoodsStyle (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/youmi-fresh/admin/category/getList',
    data
  }, catchConfig)
  return req
}
