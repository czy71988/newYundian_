<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 订单管理  订货订单列表</p>
      <!-- <div @click="chuangjian">创建Banner</div> -->
      <div class="BanNer_top_p">
        <span>创建时间：</span>
        <el-date-picker
          v-model="dkjfg"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <span>订单号：</span>
        <el-input v-model="form.orderId" placeholder="请输入内容"></el-input>
        <span>选择中心仓：</span>
        <el-select v-model="form.coreShopId" placeholder="请选择" @change="skjfergs(form.coreShopId, 1)">
          <el-option
            v-for="item in zhongxinList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <span>选择网点：</span>
        <el-select v-model="form.outletsShopId" placeholder="请选择" @change="skjfergs(form.outletsShopId, 2)">
          <el-option
            v-for="item in wangdianList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <span>选择门店：</span>
        <el-select v-model="form.storeShopId" placeholder="请选择">
          <el-option
            v-for="item in mwndianList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <div>
          <span style="cursor: pointer;" @click="qingkong">重置</span>
          <span style="cursor: pointer;" @click="sousuo">搜索</span>
          <span style="cursor: pointer;" @click="Eexport">批量导出</span>
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="BanNer_content">
      <template>
        <el-table
          :data="tableData"
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
              <span>{{scope.row.gmtCreate.substring(0, 19)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            align="center"
            label="收件人信息">
          </el-table-column>
          <el-table-column
            prop="shopName"
            align="center"
            label="门店名称">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            align="center"
            label="订单状态">
            <template slot-scope="scope">
              <span class="sdreg">{{scope.row.orderStatus | orderStatusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="utletsoName"
            align="center"
            label="所属网点">
          </el-table-column>
          <el-table-column
            prop="coreName"
            align="center"
            label="所属中心">

          </el-table-column>
          <el-table-column
            prop="shopMobile"
            align="center"
            label="门店手机号">
          </el-table-column>
          <el-table-column
            align="center"
            label="查看详情"
            width="80">
            <template slot-scope="scope">
              <span style="cursor: pointer;" class="sdreg" @click="bianji(scope.row.tradeParentId)"><i class="el-icon-edit"></i>详情</span>
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
    <!-- 弹窗部分 -- 编辑/创建 -->
    <div class="mendian_diagio">
      <el-dialog
        :visible.sync="dialogVisible">
        <p class="sdsd">订单详情</p>
        <div class="uers_dialog">
          <p class="uers_p">
            <span></span>
            <span>订单信息</span>
          </p>
          <p class="uers_p1">
            <span>订单号：{{Content.tradeParentId}}</span>
            <span>订单状态：{{Content.orderStatus | orderStatusFilter}}</span>
          </p>
          <p class="uers_p">
            <span></span>
            <span>门店信息</span>
          </p>
          <p class="uers_p1">
            <span>门店名称：{{Content.shopName}}</span>
            <span>店主姓名：{{Content.shopUserName}}</span>
            <span>手机号：{{Content.shopMobile}}</span>
            <span style="width:100%">门店地址：{{Content.shopAddress}}</span>
          </p>
          <p class="uers_p">
            <span></span>
            <span>商品信息</span>
          </p>
          <div>
            <ul class="uers_log">
              <li>商品ID</li>
              <li>图片</li>
              <li>名称</li>
              <li>价格</li>
              <li>数量</li>
            </ul>
            <ul class="uers_logs">
              <li v-for="item in shopxContent" :key="item.id">
                <span>{{item.itemId}}</span>
                <span><img :src="item.itemImg" alt=""></span>
                <span>{{item.itemTitle}}</span>
                <span>{{item.originalPrice}}</span>
                <span>{{item.itemNum}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceOrderList, InterfaceQueryOrderList } from '@/api/order'
import { InterfaceDropdownList, InterfaceDropdownlastList } from '@/api/system'
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      currentPage1: 1,

      form: {
        orderType: 1,
        orderId: '',
        orderStatus: '',
        beginCreTime: '',
        endCreTime: '',
        pageNo: '1',
        pageSize: '10',
        coreShopId: '',
        outletsShopId: '',
        storeShopId: ''
      },
      dkjfg: [],
      Content: {},
      shopxContent: [],
      total: 0,
      zhongxincang: '',
      wangdain: '',
      mendian: '',
      zhongxinList: [],
      wangdianList: [],
      mwndianList: []
    }
  },
  mounted () {
    this.getlist()
    this.getzhongxincangList()
  },
  methods: {
    // 导出
    Eexport () {
      const api = 'https://test.zk020.cn/youmi-fresh/admin/order/adminExcelOrderInfo?'
      const url = api + 'orderType=1' + '&logisticsType=' + '&orderId=' + this.form.orderId + '&orderStatus=' + '&beginCreTime=' + this.form.beginCreTime + '&endCreTime=' + this.form.endCreTime + '&coreShopId=' + this.form.coreShopId + '&outletsShopId=' + this.form.outletsShopId + '&storeShopId=' + this.form.storeShopId
      window.location.href = url
    },
    // 清空
    qingkong () {
      this.form = {
        orderType: 1,
        orderId: '',
        orderStatus: '',
        beginCreTime: '',
        endCreTime: '',
        pageNo: '1',
        pageSize: '10',
        coreShopId: '',
        outletsShopId: '',
        storeShopId: ''
      }
      this.getlist()
    },
    // 获取列表
    getlist () {
      InterfaceOrderList(this.form).then(data => {
        this.tableData = data
        console.log(data)
      })
    },
    // 获取筛选中心仓
    getzhongxincangList () {
      InterfaceDropdownList({
        type: 1
      }).then(data => {
        this.zhongxinList = data
      })
    },
    // 获取筛选网点
    skjfergs (a, b) {
      InterfaceDropdownlastList({
        parentId: a
      }).then(data => {
        if (b === 1) {
          this.wangdianList = data
        } else {
          console.log(data)
          this.mwndianList = data
        }
      })
    },
    skjferg () {},
    // 分页
    handleSizeChange (val) {
      this.form.pageSize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.form.pageNo = val
      this.getlist()
    },
    // 编辑按钮
    bianji (id) {
      const orderId = id
      InterfaceQueryOrderList({
        orderId: orderId
      }).then(data => {
        this.Content = data[0]
        this.shopxContent = this.Content.adminGoodsList
        console.log('555', this.shopxContent)
      })
      this.dialogVisible = !this.dialogVisible
    },
    // 搜索
    sousuo () {
      this.form.beginCreTime = this.dkjfg[0]
      this.form.endCreTime = this.dkjfg[1]
      this.getlist()
    }
  }
}
</script>

<style lang="less">
  .shopList {
    .BanNer_top_p {
      line-height: 20px;
      text-align: left;
      .el-input {
        height: 30px;
        display: inline-block;
        width: 200px;
        margin-right: 20px;
        .el-input__icon {
          line-height: 30px;
        }
      }
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
    .BanNer_content {
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

    .mendian_diagio {
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
          .sdsd {
            display: block;
            font-size: 18px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 40px;
            width: 500px;
            height: 40px;
            background: linear-gradient(249deg, rgba(255, 255, 255, 0.11) 0%, #164C92 100%);
            border-radius: 8px 8px 0px 0px;
            padding-left: 24px;
            box-sizing: border-box;
            text-align: left;
          }
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
  .shopList {
    padding: 0 15px;
    box-sizing: border-box;
    // ---------------------------
    .BanNer_top {
      position: relative;
      // height: 90px;
      .BanNer_top_p {
        div {
          margin-bottom: 40px;
          text-align: center;
          span {
            display: inline-block;
            width: 100px;
            height: 35px;
            background: #2B80FD;
            border-radius: 18px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 35px;
            text-align: center;
          }
          span:last-child {
            background: #FF8C14;
            margin-left: 40px;
          }
          span:first-child {
            background: #ffffff;
            color: #2B80FD;
            border: 1px solid #2B80FD;
            margin-right: 40px;
          }
        }
      }
      p {
        text-align: left;
        line-height: 90px;
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #2B80FD;
        span {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 4px;
          background: #2B80FD;
          margin: 0 10px;
        }
      }
    }
    // -----------------------------
    .BanNer_content {
      margin-top: 10px;
      .sdreg {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
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
    .mendian_diagio {
      .uers_dialog {
        padding: 10px;
        box-sizing: border-box;
        .uers_p {
          line-height: 37px;
          span {
            font-size: 13px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #2B80FD;
            margin-left: 5px;
          }
          span:first-child {
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background: #2B80FD;
          }
        }
        .uers_p1 {
          padding: 0 10px;
          box-sizing: border-box;
          span {
            display: inline-block;
            width: 50%;
            line-height: 25px;
          }
        }
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
              height: 30px;
              span {
                display:block;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                flex: 1;
                text-align: center;
                line-height: 30px;
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
</style>
