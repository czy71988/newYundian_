<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 首页</span>
      <span>首页</span>
    </div>

    <div class="shopType_home_top">
      <ul style="margin-bottom:0px">
        <li>

          <p>{{profitInfo.pickedNum || 0}}</p>
          <p>待取货</p>
        </li>
        <li>
          <p>{{profitInfo.deliveredNum || 0}}</p>
          <p>待配送</p>
        </li>
        <li>
          <p>{{profitInfo.turnoverAmount || 0}}</p>
          <p>今日营业额</p>
        </li>
      </ul>
      <ul>
        <li>
           <el-select
            class="options" v-model="profitForm.today" placeholder="请选择"
              @change="onDateChange('day')">
            <el-option
              v-for="item in days"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{profitInfo.todayPrice || 0}}</p>
          <p>今日收益</p>

        </li>
        <li>
          <el-select
            class="options" v-model="profitForm.month" placeholder="请选择"
              @change="onDateChange('month')">
            <el-option
              v-for="item in months"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{profitInfo.monthPrice || 0}}</p>
          <p>本月收益</p>
        </li>
        <li>
          <el-select
            class="options" v-model="profitForm.year" placeholder="请选择"
              @change="onDateChange('year')">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{profitInfo.yearPrice || 0}}</p>
          <p>今年收益</p>
        </li>
      </ul>
    </div>
    <h1 style="padding-bottom:10px">
      今日订单
    </h1>
    <!-- 表格部分 -->
    <div class="shopType_content">
      <template>
        <el-table
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="logisticsType"
            align="center"
            label="订单类型">
            <template slot-scope="scope">
              <span>{{scope.row.logisticsType | logisticsTypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下单时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate | dateFilter('MM:dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="buyMobile"
            align="center"
            label="买家手机号">
          </el-table-column>
          <el-table-column
            prop="receiverFullAddress"
            align="center"
            label="收货地址">
            <template slot-scope="{row}">
              <span>{{row.logisticsType === 1 ? '暂无' : row.receiverFullAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="订单详情">
            <template slot-scope="scope">
              <span style="cursor: pointer;" @click="moke(scope.row)">查看订单详情</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            align="center"
            label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.orderStatus | orderStatusFilter(scope.row.logisticsType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="100">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" v-if="row.orderStatus === 2" @click="caozuo(row)">{{row.logisticsType === 1 ? '已取走' : '已送达'}}</el-button>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页 -->
    <div class="bottom_bottom">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.pageNo"
          :page-size="form.pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- dialog弹窗 -->

    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="shopType_diagio">
      <el-dialog
        :visible.sync="shopShow"
        width="50%">
        <div class="display-table">
          <el-table
            :data="goodsList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="itemId"
              align="center"
              label="商品ID">
            </el-table-column>
            <el-table-column
              prop="itemImg"
              align="center"
              label="图片">
              <template slot-scope="{row}">
                <img style="width:100px;height:100px" :src="row.itemImg" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="itemTitle"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="originalPrice"
              align="center"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="itemNum"
              align="center"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="goodsWeight"
              align="center"
              label="重量">
            </el-table-column>
            <el-table-column
              prop="label"
              align="center"
              label="标签">
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceOrderList, orderConfirmReceipt, InterfaceQueryOrderList } from '@/api/order'
import { getStoreProfitInfo } from '@/api/system'
import { formatOrder } from '@/utils/format'
const getTodyDate = () => {
  const now = new Date()
  const startDate = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`)
  const endDate = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate() + 1}`)
  return {
    start: startDate.getTime(),
    end: endDate.getTime(),
    today: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
  }
}

const getYears = () => {
  const date = new Date()
  const year = date.getFullYear()
  const years = []
  const len = 60
  for (let i = 0; i <= len; i++) {
    years.push({
      value: year - i,
      label: `${year - i}年`
    })
  }
  return years
}
const todyDate = getTodyDate()
const getMonths = () => {
  const months = []
  const len = 12
  for (let i = 1; i <= len; i++) {
    months.push({
      value: i,
      label: `${i}月`
    })
  }
  return months
}
const getDays = (year, month) => {
  const date = new Date(year, month, 0)
  const days = []
  const len = date.getDate()
  for (let i = 1; i <= len; i++) {
    days.push({
      value: i,
      label: `${i}日`
    })
  }
  return days
}

export default {
  filters: {
    logisticsTypeFilter (val) {
      if (!val) return '--'
      return val === 1 ? '自取订单' : '配送订单'
    },
    orderStatusFilter (val, logisticsType) {
      if (val === 1) return '待付款'
      if (val === 2) return '待收货'
      if (val === 3) return logisticsType === 1 ? '已取货' : '已送达'
      if (val === 4) return '取消订单'
    }
  },
  data () {
    return {
      currentPage1: 1,
      shopShow: false,
      shopxContent: [],
      list: [],
      total: 0,
      goodsList: [],
      form: {
        orderType: 2,
        beginCreTime: todyDate.start,
        endCreTime: todyDate.end,
        pageNo: 1,
        pageSize: 3
      },
      profitForm: {
        today: todyDate.today,
        month: todyDate.month,
        year: todyDate.year
      },
      profitInfo: {},
      years: getYears(),
      months: getMonths(),
      days: getDays(todyDate.year, todyDate.month)
    }
  },
  created () {
    this.getOrderList()
    this.getProfitInfo()
    console.log(this.days)
  },
  mounted () {
  },
  methods: {
    // 重新获取收益
    onDateChange (type) {
      const { year, month, today } = this.profitForm
      if (type === 'year' || type === 'month') {
        // 重新获取日选项
        const days = getDays(year, month)
        console.log(days)
        const maxDay = days[days.length - 1].value
        if (today > maxDay) {
          this.profitForm.today = maxDay
        }
      }
      this.getProfitInfo()
    },
    getOrderList () {
      const form = this.form
      const { pageNo } = form
      InterfaceOrderList(form).then(data => {
        let list = data || []
        if (list.length < 1) {
          if (pageNo === 1) {
            this.total = 0
          }
        }
        if (pageNo === 1 && list[0]) {
          this.total = list[0].totalCount
        }
        list = list.map(item => {
          return formatOrder(item)
        })
        this.list = list
      })
    },
    // 获取收益信息
    getProfitInfo () {
      const form = this.profitForm
      getStoreProfitInfo(form).then(data => {
        console.log(data)
        this.profitInfo = data || {}
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
      this.form.pageNo = val
      this.getOrderList()
    },
    // 操作按钮
    caozuo (row) {
      const label = `是否确定${row.logisticsType === 1 ? '已取走' : '已收货'}`
      this.$confirm(label)
        .then(() => {
          this.updateOrderStatus(row)
        })
        .catch(() => {
          console.log('reject')
        })
    },
    updateOrderStatus (row) {
      orderConfirmReceipt({
        orderId: row.tradeParentId
      })
        .then(data => {
          this.$message.success('确认收货成功')
          this.form.pageNo = 1
          this.getOrderList()
        })
        .catch(err => {
          this.$message.error('确认收货失败' + err.message)
        })
    },
    // 查看按钮
    moke (row) {
      this.getOrderDetail(row)
    },
    getOrderDetail (row) {
      InterfaceQueryOrderList({
        orderId: row.tradeParentId
      }).then(data => {
        console.log('1', data)
        this.goodsList = data[0].adminGoodsList
        console.log('2', this.goodsList)
        this.shopShow = !this.shopShow
      })
        .catch(err => {
          this.$message.error('获取商品信息失败' + err.message)
        })
    }
  }
}
</script>

<style lang="less">
  .shopType {
    .shopType_content {
      .el-table {
        line-height: 40px !important;
        border-radius: 6px 6px 0px 0px;
      }
      .el-table th, .el-table {
        background: #163D70;
        font-size: 13px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        td {
          padding: 0;
        }
        tr {
          color: #333333;
          font-weight: 400;
          font-family: MicrosoftYaHei;
          background-color: #E6EEFD;
        }
        .el-table__row--striped {
          background-color: #D7E5FB;
        }
      }
      .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #92cbf1;
      }
    }
    .bottom_bottom {
      .el-pager, .el-pager li {
        background-color: #D7E5FB;
      }
      .el-pagination .btn-next, .el-pagination .btn-prev {
        background-color: #D7E5FB;
      }
    }
    .shopType_diagio {
      .el-dialog {
        width: 500px;
        // height: 430px;
        background: #FFFFFF;
        border-radius: 8px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          padding: 0;
          height: 100%;
          // .sdsd {
          //   display: block;
          //   font-size: 18px;
          //   font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          //   font-weight: bold;
          //   color: #FFFFFF;
          //   line-height: 40px;
          //   width: 500px;
          //   height: 40px;
          //   background: linear-gradient(249deg, rgba(255, 255, 255, 0.11) 0%, #164C92 100%);
          //   border-radius: 8px 8px 0px 0px;
          //   padding-left: 24px;
          //   box-sizing: border-box;
          //   text-align: left;
          // }
          .el-form {
            box-sizing: border-box;
            .el-form-item {
              margin-bottom: 20px;
              height: 30px;
              line-height: 30px;
              .el-form-item__label {
                line-height: 30px;
              }
              .el-form-item__content {
                text-align: left;
                height: 30px;
                line-height: 30px;
                .el-input__inner {
                  line-height: 30px;
                  height: 30px;
                  width: 300px;
                  background: #F4F4F4;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .shopType {
    padding: 0 15px;
    box-sizing: border-box;
    .shopType_top {
      line-height: 92px;
      span {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #2B80FD;
      }
      span:last-child {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
        font-weight: 400;
        margin-left: 30px;
      }
    }
    .shopType_home_top {
      .options {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 100px;
      }
      ul {
        width: 100%;
        height: 100px;
        list-style: none;
        display: flex;
        margin-bottom: 20px;
        background: linear-gradient(249deg, rgba(255, 255, 255, 0.11) 0%, #164C92 100%);
        li {
          position: relative;
          flex: 1;
          text-align: center;
          color: #e3e3e3;
          border: 1px solid #e3e3e3;
          p {
            font-size: 22px;
            line-height: 60px;
            font-weight: 400;
          }
          p:last-child {
            font-size: 18px;
            line-height: 30px;
          }
        }
        li:last-child {
          color: rgb(77, 75, 75);
        }
      }
    }
    .shopType_content {
      .sdfsgerg {
        width: 30px;
        height: 30px;
      }
      .shopType_span1 {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
        line-height: 17px;
      }
      .shopType_span2 {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
        line-height: 17px;
      }
      .shopType_span22 {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #FF8C14;
        line-height: 17px;
      }
    }
    .bottom_bottom {
      height: 40px;
      padding: 0 50px;
      background: #D7E5FB;
      border-radius: 0px 0px 6px 6px;
      box-sizing: border-box;
      .block {
        display: inline-block;
        float: right;
      }
    }
    .shopType_diagio {
      .uers_dialog {
        padding: 10px;
        box-sizing: border-box;
        // .uers_p {
        //   line-height: 37px;
        //   span {
        //     font-size: 13px;
        //     font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        //     font-weight: bold;
        //     color: #2B80FD;
        //     margin-left: 5px;
        //   }
        //   span:first-child {
        //     display: inline-block;
        //     width: 4px;
        //     height: 4px;
        //     border-radius: 2px;
        //     background: #2B80FD;
        //   }
        // }
        // .uers_p1 {
        //   padding: 0 10px;
        //   box-sizing: border-box;
        //   .dkjfgt {
        //     // display: block;
        //     width: 100%;
        //     line-height: 25px;
        //   }
        //   span {
        //     display: inline-block;
        //     width: 50%;
        //     line-height: 25px;
        //   }
        // }
        div {
          .uers_log {
            display: flex;
            line-height: 30px;
            background: #163D70;
            border-radius: 6px 6px 0px 0px;
            li {
              flex: 1;
              text-align: center;
              list-style: none;
              font-size: 13px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
            }
          }
          .uers_logs {
            li {
              display: flex;
              background: #F2F6FF;
              align-items: center;
              padding: 5px 0;
              box-sizing: border-box;
              margin-bottom: 5px;
              span {
                display:block;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                flex: 1;
                text-align: center;
                font-size: 13px;
                font-family: MicrosoftYaHei;
                color: #333333;
                img {
                  height: 30px;
                  width: 45px;
                }
              }
            }
          }
        }
      }
    }
  }
  .chuangjian_shop_dialog {
    ul {
      list-style: none;
      li {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin: 5px;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
</style>
