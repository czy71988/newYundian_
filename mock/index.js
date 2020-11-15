// import rechargeMocks from './recharge'
// import userMocks from './user'
import Mock from 'mockjs'
import url from 'url'
import qs from 'querystring'
import goodsMocks from './goods'
const mocks = [...goodsMocks]
for (const mock of mocks) {
  Mock.mock(mock.url, mock.type, (options) => {
    // eslint-disable-next-line node/no-deprecated-api
    const params = qs.parse(url.parse(options.url).query)
    options.body = JSON.parse(options.body || '{}')
    options.params = params
    return mock.template(options)
  })
}

export default {
  // rechargeMocks
}
