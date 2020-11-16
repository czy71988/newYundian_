import { Interfaceorderexport } from '@/api/order'
import { Message } from 'element-ui'
const state = {
}

const mutations = {
}

const actions = {
  // 导出订单文件
  exportOrderExcel (context, params) {
    return new Promise((resolve, reject) => {
      Interfaceorderexport(params)
        .then(data => {
          console.log(data)
          const href = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = href
          link.setAttribute('download', params.filename || '订单.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(href)
        })
        .catch(err => {
          Message.error('订单导出失败,' + err.message)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
