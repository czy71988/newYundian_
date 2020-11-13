<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 订单管理</span>
      <span>自提订单</span>
    </div>

    <div class="top">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <el-button type="info" plain>重置</el-button>
      <el-button type="success" plain>导出</el-button>
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
            label="下单时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="realPay"
            align="center"
            label="实付金额">
            <template slot-scope="scope">
              <span>{{scope.row.realPay}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="shopName"
            align="center"
            label="取货码">
            <template slot-scope="scope">
              <span>{{scope.row.pickNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="coreName"
            align="center"
            label="订单状态">
            <template slot-scope="scope">
              <span>{{scope.row.orderStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="buyMobile"
            align="center"
            label="买家手机号">
          </el-table-column>
          <el-table-column
            align="center"
            label="商品详情"
            width="100">
            <template slot-scope="scope">
              <span class="shopType_span1" @click="bianji(scope.row)"><i class="el-icon-edit"></i>点击查看详商品</span>
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
              <li>重量</li>
              <li>标签</li>
            </ul>
            <ul class="uers_logs">
              <li v-for="item in shopxContent" :key="item.id">
                <span>1</span>
                <span><img src="@/assets/微信图片_20201016132405.jpg" alt=""></span>
                <span>可视对讲你哥哥</span>
                <span>78</span>
                <span>2000</span>
                <span>200</span>
                <span>当日达</span>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceOrderList } from '@/api/order'
import { formatOrder } from '@/utils/format'
export default {
  data () {
    return {
      shopxContent: [],
      list: [],
      form: {
        orderType: 2,
        logisticsType: 1,
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    // 分页
    handleSizeChange (val) {},
    handleCurrentChange (val) {},
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
        list = list.map(item => {
          return formatOrder(item)
        })
        this.list = pageNo === 1 ? list : [...this.list, ...list]
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
    .top {
      margin-bottom: 20px;
      .input {
        margin: 0 10px;
        width: 200px;
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
