import Mock from 'mockjs'

const mocks = []
mocks.push({
  url: /\/api\/recharge\/list*/,
  type: 'get',
  template: (options) => {
    const { pageNo = 1, pageRow = 15 } = options.params
    const total = 47
    // 当前未拉取的条数
    // 获取当前拉取的条数
    const remain = (total - pageRow * (pageNo - 1))
    const realRetRow = remain < pageRow ? remain : pageRow
    console.group('拉取列表')
    console.log(options)
    console.log(options.params)
    console.log(realRetRow)
    console.groupEnd()
    return {
      result: 'success',
      code: 200,
      errMsg: '请求失败',
      data: Mock.mock({
        [`list|${realRetRow}`]: [
          {
            'id|+1': 1000 * pageNo,
            date: '@date(yyyy-MM-dd hh:mm:ss)',
            storeName: '@cname',
            amount: '@integer(100, 200000)'
          }
        ],
        total
      })
    }
  }
})

mocks.push({
  url: /\/api\/task\/list*/,
  type: 'get',
  template: (options) => {
    const { pageNo = 1, pageRow = 15 } = options.params
    const total = 50
    // 当前未拉取的条数
    // 获取当前拉取的条数
    const remain = (total - pageRow * (pageNo - 1))
    const realRetRow = remain < pageRow ? remain : pageRow
    console.group('拉取列表')
    console.log(options)
    console.log(options.params)
    console.log(realRetRow)
    console.groupEnd()
    return {
      result: 'success',
      code: 200,
      errMsg: '请求失败',
      data: Mock.mock({
        [`list|${realRetRow}`]: [
          {
            'id|+1': 1000 * pageNo,
            'taskId|+1': 155555555 * pageNo,
            deliveryDate: '@date(yyyy-MM-dd hh:mm:ss)',
            storeName: '@cname',
            avatar: '@image(200x100, #fb0a2a)',
            userName: '@cname',
            status: 1,
            amount: '@integer(100, 200000)',
            orderNum: '@integer(10000, 20000)',
            orderFinishedNum: '@integer(9000, 10000)',
            orderWillAgreeNum: '@integer(8000, 9000)',
            orderAgreedNum: '@integer(7000, 8000)',
            orderRejectedNum: '@integer(6000, 7000)',
            getAmount: '@integer(2000, 7000)'
          }
        ],
        total
      })
    }
  }
})
export default mocks
