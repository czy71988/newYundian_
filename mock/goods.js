
import goodsListRes from './goods-list.res.json'
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
  url: /\/product\/query\/page*/,
  type: 'get',
  template: (options) => {
    const { pageNo, pageSize } = options.params
    const goodsList = goodsListRes.data.records
    const total = goodsListRes.data.total
    const totalPageNum = Math.ceil(total / pageSize)
    const list = pageSize > totalPageNum ? [] : goodsList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    const result = depCopyForObj(goodsListRes)
    result.data.records = list
    return result
  }
})

export default mocks
