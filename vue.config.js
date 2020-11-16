
// import { baseURL } from './src/utils/khg'
// console.log(baseURL)
// const baseURL = 'http://test.bee.zk020.cn'
// const baseURL = 'http://bee.zk020.cn'
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/youmi-fresh': {
  //       target: 'https://test.zk020.cn/',
  //       changeOrigin: true // 是否改变源地址

  //     }
  //   }
  // },
  configureWebpack: {
    externals: {
      TMap: 'TMap'
    },
    module: {
      // rules: [{
      //   // test: /\.json$/,
      //   // use: 'json-loader'
      // }
      // ]
    }
  }
}
