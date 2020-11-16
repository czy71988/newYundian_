<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 财务结算</span>
      <span>财务结算</span>
    </div>

      <div class="DataDisplayBoard">
        <div>
          <p>{{xinxi.todayPrice}}</p>
          <p>今日收益</p>
        </div>
        <div>
          <p>{{xinxi.monthPrice}}</p>
          <p>本月收益</p>
          <span>
            <el-select @change="yuefenclick" v-model="from.month" placeholder="请选择月份">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div>
          <p>{{xinxi.yearPrice}}</p>
          <p>今年收益</p>
          <span>
            <el-select @change="yuefenclick" v-model="from.year" placeholder="请选择年份">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
      </div>
    <div class="top">
       <el-date-picker
        v-model="time"
        value-format="timestamp"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="sousuo" type="primary" plain>搜索</el-button>
      <el-button type="info" plain>重置</el-button>
    </div>

    <!-- 表格部分 -->
    <div class="shopType_content">
      <template>
        <el-table
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="tradeParentId"
            align="center"
            label="订单编号">
          </el-table-column>
          <el-table-column
            align="center"
            label="订单类型">
            <template slot-scope="scope">
              <span>{{scope.row.orderType === 1 ? '订货订单' : (scope.row.orderType === 2 ? '普通订单' : '拨货订单')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下单时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate.substring(0, 19)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalGoodsPrice"
            align="center"
            label="实付金额">
          </el-table-column>
          <el-table-column
            prop="buyMobile"
            align="center"
            label="买家手机号">
          </el-table-column>
          <el-table-column
            prop="shopName"
            align="center"
            label="所属门店">
          </el-table-column>
          <el-table-column
            prop="utletsoName"
            align="center"
            label="所属网点">
          </el-table-column>
          <el-table-column
            align="center"
            label="查看详情"
            width="100">
            <template slot-scope="scope">
              <span class="shopType_span1" @click="bianji(scope.row.tradeParentId)"><i class="el-icon-edit"></i>订单详情</span>
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
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>
    <!-- dialog弹窗 -->

    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="shopType_diagio">
      <el-dialog
        :visible.sync="shopShow">
        <div class="uers_dialog">
          <div>
            <ul class="uers_log">
              <li>商品ID</li>
              <li>图片</li>
              <li>名称</li>
              <li>价格</li>
              <li>数量</li>
              <!-- <li>重量</li> -->
              <li>标签</li>
            </ul>
            <ul class="uers_logs">
              <li v-for="item in shopxContent" :key="item.id">
                <span>{{item.itemId}}</span>
                <span><img :src="item.itemImg" alt=""></span>
                <span>{{item.itemTitle}}</span>
                <span>{{item.originalPrice}}</span>
                <span>{{item.itemNum}}</span>
                <!-- <span>{{200}}</span> -->
                <span>{{item.label}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { SettlementStoreRevenue } from '../../api/system'
import { InterfaceOrderList, InterfaceQueryOrderList } from '../../api/order'
export default {
  data () {
    return {
      currentPage1: 1,
      shopxContent: [],
      list: [],
      options: [
        { value: '1', label: '1月份' },
        { value: '2', label: '2月份' },
        { value: '3', label: '3月份' },
        { value: '4', label: '4月份' },
        { value: '5', label: '5月份' },
        { value: '6', label: '6月份' },
        { value: '7', label: '7月份' },
        { value: '8', label: '8月份' },
        { value: '9', label: '9月份' },
        { value: '10', label: '10月份' },
        { value: '11', label: '11月份' },
        { value: '12', label: '12月份' }
      ],
      options2: [
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' }
      ],
      from: {
        coreShopId: sessionStorage.getItem('id'),
        today: '',
        month: '',
        year: ''
      },
      outfrom: {
        orderType: 2,
        beginCreTime: '',
        endCreTime: '',
        pageNo: '1',
        pageSize: '10'
      },
      xinxi: '',
      time: '',
      shopShow: false
    }
  },
  mounted () {
    this.getxinxi()
    this.getList()
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getList()
    },
    getxinxi () {
      SettlementStoreRevenue(this.from).then(data => {
        this.xinxi = data
      })
    },
    yuefenclick () {
      this.getxinxi()
    },
    getList () {
      InterfaceOrderList(this.outfrom).then(data => {
        this.list = data
      })
    },
    sousuo () {
      this.outfrom.beginCreTime = this.time[0]
      this.outfrom.endCreTime = this.time[1]
      this.getList()
    },
    bianji (id) {
      const orderId = id
      InterfaceQueryOrderList({
        orderId: orderId
      }).then(data => {
        // this.Content = data[0]
        // this.time = this.Content.gmtCreate
        this.shopxContent = this.Content.adminGoodsList
      })
      this.shopShow = !this.shopShow
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
  .DataDisplayBoard {
    .el-select {
      border: none  !important;
    }
    .el-input__inner {
      width: 100px;
      // margin-right: 10px;
      padding: 0;
    }
  }
</style>

<style lang="less" scoped>
  .shopType {
    padding: 0 15px;
    box-sizing: border-box;
    .top {
      margin-bottom: 20px;
      .input {
        margin: 0 10px;
        width: 200px;
      }
    }
    .DataDisplayBoard {
      display: flex;
      margin-bottom: 20px;
      div {
        height: 100px;
        flex: 1;
        border: 1px solid #e3e3e3;
        position: relative;
        span {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        p {
          text-align: center;
          // line-height: ;
        }
        p:first-child {
          font-size: 24px;
          line-height: 70px;
        }
      }
    }
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
      ul {
        width: 100%;
        height: 100px;
        list-style: none;
        display: flex;
        margin-bottom: 20px;
        background: linear-gradient(249deg, rgba(255, 255, 255, 0.11) 0%, #164C92 100%);
        li {
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
