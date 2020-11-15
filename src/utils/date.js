const padding0ForKeep2Digit = (val) => {
  return val < 10 ? ('0' + val) : val
}

const format = (val, fmt) => {
  if (typeof val === 'string') val = val.replace(/-/g, '/')
  const temp = new Date(val)
  const year = temp.getFullYear()
  const month = padding0ForKeep2Digit(temp.getMonth() + 1)
  const day = padding0ForKeep2Digit(temp.getDate())
  const hours = padding0ForKeep2Digit(temp.getHours())
  const minutes = padding0ForKeep2Digit(temp.getMinutes())
  const seconds = padding0ForKeep2Digit(temp.getSeconds())
  let result = ''
  if (fmt) {
    result = fmt.replace('yyyy', year)
    result = result.replace('MM', month)
    result = result.replace('dd', day)
    result = result.replace('hh', hours)
    result = result.replace('mm', minutes)
    result = result.replace('ss', seconds)
  } else {
    result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  return result
}

export default {
  format
}
