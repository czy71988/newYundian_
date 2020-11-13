
import { mapConfig } from '../utils/config.js'
const request = (cfg = { url: '', params: {} }) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    const { params, url } = cfg
    params.key = mapConfig.key
    params.output = 'jsonp'
    const paramsStr = Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`
    }).join('&')
    window[params.callback] = (res) => {
      document.getElementsByTagName('head')[0].removeChild(script)
      if (res.status === 0) {
        resolve(res.result || res)
        return
      }
      reject(new Error(res.message))
    }
    script.src = mapConfig.baseUrl + url + '?' + paramsStr
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onerror = reject
  })
}

export default request
