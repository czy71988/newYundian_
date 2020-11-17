<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 财务结算</span>
      <span>财务结算</span>
    </div>

    <div class="shopType_home_top">
      <ul>
        <li>
          <p>{{xinxi.saleTotalPrice}}</p>
          <p>销售总额</p>
        </li>
        <li>
          <p>{{xinxi.settledAmount}}</p>
          <p>已结算金额</p>
        </li>
        <li>
          <p>{{xinxi.auditAmount}}</p>
          <p>审核中金额</p>
        </li>
        <li>
          <p>{{xinxi.toBeAmount}}</p>
          <p>可结算金额 <span @click="settlement" style="margin-left: 10px; font-size: 12px; cursor: pointer;">申请结算</span></p>
        </li>
      </ul>
    </div>
    <!-- 表格部分 -->
    <div class="shopType_content">
      <template>
        <el-table
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="订单编号">
          </el-table-column>
          <el-table-column
            align="center"
            label="申请时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyAmount"
            align="center"
            label="申请结算金额">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="审核结果">
          </el-table-column>
          <el-table-column
            align="center"
            label="发票是否寄出">
            <template slot-scope="scope">
              <span style="cursor: pointer;" v-if="scope.row.invoiceSendOut == '未寄出'" @click="moke(scope.row.id)">{{scope.row.invoiceSendOut}}</span>
              <span v-else>{{scope.row.invoiceSendOut}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="logisticsNum"
            align="center"
            label="物流单号">
          </el-table-column>
          <el-table-column
            align="center"
            label="是否已打款">
            <template slot-scope="scope">
              <el-image
               v-if="scope.row.paymentVoucher !== '' && scope.row.paymentVoucher !== null"
                style="width: 100%; height: 100%"
                :src="scope.row.paymentVoucher"
                :preview-src-list="[scope.row.paymentVoucher]">
              </el-image>
              <span v-else>否</span>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- dialog弹窗 -->

    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="shopType_diagio">
      <el-dialog
        :visible.sync="shopShow"
        width="30%">
        <div class="uers_dialog">
          <div class="ksdjhfk">
            <el-input class="sjdf" v-model="shbfev.logisticsCompany" placeholder="请输入物流公司"></el-input>
            <el-input class="sjdf" v-model="shbfev.logisticsNum" placeholder="请输入物流单号"></el-input>
            <el-button type="primary" @click="kjdvifjiv">确定</el-button>
            <el-button type="primary" plain  @click="sdfgbgb">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceFinance, settlementstore, SettlementListstore, SettlementUpdate } from '../../../api/system'
export default {
  data () {
    return {
      xinxi: '',
      currentPage1: 1,
      shopShow: false,
      shopxContent: [],
      from: {
        status: '',
        isSettle: '',
        pageNo: '1',
        pageSize: '10'
      },
      shbfev: {
        id: '',
        logisticsCompany: '',
        logisticsNum: ''
      },
      total: 0,
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取信息
    getList () {
      InterfaceFinance().then(data => {
        console.log('信息', data)
        this.xinxi = data
      })
      SettlementListstore(this.from).then(data => {
        console.log('结算列表', data)
        this.list = data
        this.total = data.total
      })
    },
    // 申请结算
    settlement () {
      if (this.xinxi.toBeAmount > 0) {
        settlementstore().then(data => {
          console.log('申请结算', data)
          this.$message({
            message: '结算成功',
            type: 'success'
          })
        })
      } else {
        this.$message.error('可结算金额不足')
      }
    },
    // 分页
    handleSizeChange (val) {
      this.from.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.from.pageNo = val
      this.getList()
    },
    // // 填写物流单号
    moke (id) {
      this.shopShow = !this.shopShow
      this.shbfev.id = id
    },
    kjdvifjiv () {
      SettlementUpdate(this.shbfev).then(data => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.sdfgbgb()
        this.getList()
      })
    },
    sdfgbgb () {
      this.shopShow = !this.shopShow
      this.shbfev = {
        id: '',
        logisticsCompany: '',
        logisticsNum: ''
      }
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
          color: rgb(255, 255, 255);
          span {
            color: #163D70;
          }
        }
      }
    }
    .shopType_content {
      .img_class {
        width: 100%;
        height: 100%;
      }
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
        // padding: 10 80px;
        box-sizing: border-box;
        text-align: center;
        .ksdjhfk {
          padding: 30px 80px;
          box-sizing: border-box;
        }
        .sjdf {
          margin-bottom: 20px;
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
