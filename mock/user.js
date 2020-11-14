import Mock, { Random } from 'mockjs'
const verifyCodeMap = {
}
const mocks = []
mocks.push({
  url: /\/api\/user\/sendVerifyCode*/,
  type: 'post',
  template: (options) => {
    const { phone } = options.body
    const code = Random.integer(10000, 999999)
    verifyCodeMap[code] = phone
    return {
      result: 'success',
      code: 200,
      errMsg: '请求失败',
      data: code
    }
  }
})

mocks.push({
  url: /\/api\/user\/login*/,
  type: 'post',
  template: (options) => {
    const { phone, verifyCode } = options.body
    console.log(JSON.stringify(verifyCodeMap))
    if (verifyCodeMap[verifyCode] !== phone) {
      return {
        code: 203,
        errMsg: '验证码不正确',
        data: ''
      }
    }
    return {
      result: 'success',
      code: 200,
      errMsg: '',
      data: '1'
    }
  }
})
mocks.push({
  url: /\/api\/user\/info*/,
  type: 'get',
  template: (options) => {
    console.log(options)
    return {
      result: 'success',
      code: 200,
      errMsg: '',
      data: Mock.mock({
        userName: '@cname',
        avatar: '@image(400x400, #fb0a2a)',
        inviteCode: '@integer(10000, 99999)',
        amount: '@integer(0, 60000)'
      })
    }
  }
})
mocks.push({
  url: /\/api\/user\/withdrawInf*/,
  type: 'get',
  template: (options) => {
    return {
      result: 'success',
      code: 200,
      errMsg: '',
      data: Mock.mock({
        sum: '@integer(10000, 20000)',
        withdrawing: '@integer(5000, 6000)',
        withdrawed: '@integer(3000, 4000)'
      })
    }
  }
})
mocks.push({
  url: /\/api\/user\/withdraw*/,
  type: 'post',
  template: (options) => {
    const { amount } = options.body
    if (amount > 1000) {
      return {
        code: 203,
        errMsg: '可提现金额不足',
        data: null
      }
    }
    return {
      result: 'success',
      code: 200,
      errMsg: '',
      data: null
    }
  }
})
// mocks.push({
//   url: /\/api\/user\/withdrawList*/,
//   type: 'post',
//   template: (options) => {
//     const { amount } = options.body
//     if (amount > 1000) {
//       return {
//         code: 203,
//         errMsg: '可提现金额不足',
//         data: null
//       }
//     }
//     return {
//       result: 'success',
//       code: 200,
//       errMsg: '',
//       data: null
//     }
//   }
// })

mocks.push({
  url: /\/api\/user\/withdrawList*/,
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
            date: '@date(yyyy-MM-dd hh:mm:ss)',
            avatar: '@image(200x100, #fb0a2a)',
            amount: '@integer(100, 200000)',
            remainAmount: '@integer(100, 200000)',
            type: '@integer(1, 2)'
          }
        ],
        total
      })
    }
  }
})
export default mocks
