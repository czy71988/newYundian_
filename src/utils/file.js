
import Vue from 'vue'
import { orderStatus } from './commit'

// 订单状态过滤
Vue.filter('orderStatusFilter', val => {
  if (!val) return '--'
  let label = ''
  orderStatus.some(item => {
    if (item.value === val) {
      label = item.label
      return true
    }
  })
  return label
})

Vue.filter('outtiame', val => {
  const date = new Date(val)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
})
