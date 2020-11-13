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
          <p>2</p>
          <p>销售总额</p>
        </li>
        <li>
          <p>100</p>
          <p>已结算金额</p>
        </li>
        <li>
          <p>20000</p>
          <p>可结算金额 <span style="margin-left: 10px; font-size: 12px; color: ">申请结算</span></p>
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
            prop="tradeParentId"
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
            prop="totalGoodsNum"
            align="center"
            label="申请结算金额">
          </el-table-column>
          <el-table-column
            prop="shopName"
            align="center"
            label="审核结果">
          </el-table-column>
          <el-table-column
            align="center"
            label="发票是否寄出">
            <template slot-scope="scope">
              <span v-if="scope.row.y === 1">是</span>
              <span v-else-if="scope.row.y === 2">否</span>
              <span v-else @click="moke(scope)">填写物流单号</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="coreName"
            align="center"
            label="物流单号">
          </el-table-column>
          <el-table-column
            align="center"
            label="是否已打款"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1" >是</span>
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
          :total="1000">
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
          <el-input class="sjdf" v-model="input" placeholder="请输入物流公司"></el-input>
          <el-input class="sjdf" v-model="input" placeholder="请输入物流单号"></el-input>
          <el-button type="primary">确定</el-button>
          <el-button type="primary" plain>取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage1: 1,
      shopShow: false,
      shopxContent: [],
      list: [
        { tradeParentId: '自取订单', gmtCreate: '2020-11-11', totalGoodsNum: '18321201141', shopName: '上海市青浦区华新镇华志路1685号', coreName: '已取货' }
      ]
    }
  },
  mounted () {
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    },
    // // 填写物流单号
    moke () {
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
        padding: 10 80px;
        box-sizing: border-box;
        text-align: center;
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
