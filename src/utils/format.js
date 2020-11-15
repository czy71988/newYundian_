
const formatAddress = (addressInfo = {}) => {
  let { province, city, district, address, houseNumber } = addressInfo
  address = address + houseNumber
  if (address.indexOf(province) === 0) {
    return address
  }
  if (address.indexOf(city) === 0) {
    return province === city ? address : (province + address)
  }

  const prefix = province === city ? province : (province + city)
  if (address.indexOf(district) === 0) {
    return prefix + address
  }
  return prefix + district + address
}

const formatOrder = order => {
  const { totalGoodsPrice, deliveryFee, receiverProvince, receiverCity, receiverDistrict, shortAddress, houseNumber } = order
  return Object.assign({}, order, {
    realPay: ((totalGoodsPrice || 0) * 100 + (deliveryFee || 0) * 100) / 100,
    receiverFullAddress: formatAddress({
      province: receiverProvince,
      city: receiverCity,
      district: receiverDistrict,
      address: shortAddress,
      houseNumber
    })
  })
}

export {
  formatOrder
}
