import jsonp from '../utils/request.jsonp'

export function getLocationByIp () {
  return jsonp({
    url: '/ws/location/v1/ip',
    params: {
      callback: 'getLocationByIp'
    }
  })
}

export function getSuggestionAddressList (keyword) {
  return jsonp({
    url: '/ws/place/v1/suggestion',
    params: {
      callback: 'getSuggestionAddressList',
      keyword
    }
  })
}

// 逆地址解析 https://apis.map.qq.com/ws/geocoder/v1/?location=
export function getAddressByLatLng ({ lat, lng }) {
  return jsonp({
    url: '/ws/geocoder/v1',
    params: {
      callback: 'getAddressByLatLng',
      location: `${lat},${lng}`
    }
  })
}
