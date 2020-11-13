
const baseURL = 'http://test.bee.zk020.cn'

export function deleteElementByValue (arr, varElement) {
  for (var i = 0; i < arr.length; i++) {
    // 严格比较，即类型与数值必须同时相等。
    if (arr[i].url === varElement) {
      arr.splice(i, 1)
      break
    }
  }
  return arr
}

export default {
  baseURL,
  deleteElementByValue
}
