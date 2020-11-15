
import orderListRes from './order.res.json'
const mocks = []

// 对对象深拷贝
const depCopyForObj = (obj) => {
  const keys = Object.keys(obj)
  const result = {}
  keys.forEach(key => {
    const value = obj[key]
    if (value !== null && typeof value === 'object' && !Array.isArray(obj[key])) {
      result[key] = depCopyForObj(value)
    } else {
      result[key] = value
    }
  })

  return result
}

mocks.push({
  url: /\/admin\/order\/adminFindOrderInfo*/,
  type: 'get',
  template: (options) => {
    console.log(JSON.stringify(options))
    const { pageNo, pageSize } = options.params
    const orederList = orderListRes.data
    const total = orederList.length
    const totalPageNum = Math.ceil(total / pageSize)
    const list = pageNo > totalPageNum ? [] : orederList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    const result = depCopyForObj(orderListRes)
    result.data = list
    return result
  }
})

export default mocks
