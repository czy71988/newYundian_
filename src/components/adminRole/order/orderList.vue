<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 订单管理</span>
      <span>拨货订单</span>
    </div>
    <div class="top">
      <span>选择中心仓：</span>
      <el-select v-model="zhongxincang" placeholder="请选择" @change="skjfergs(zhongxincang, 1)">
        <el-option
          v-for="item in zhongxinList"
          :key="item.id"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>
      <span>选择网点：</span>
      <el-select v-model="wangdain" placeholder="请选择" @change="skjfergs(wangdain, 2)">
        <el-option
          v-for="item in wangdianList"
          :key="item.id"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>
      <span>选择门店：</span>
      <el-select v-model="mendian" placeholder="请选择">
        <el-option
          v-for="item in mwndianList"
          :key="item.id"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>

      <span class="skdjfrr" @click="sousuo">搜索</span>
      <span class="skdjfrr1" @click="Eexport">导出</span>
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
            label="操作时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate.substring(0, 19)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalGoodsNum"
            align="center"
            label="拨货数量">
          </el-table-column>
          <el-table-column
            prop="shopName"
            align="center"
            label="所属门店">
          </el-table-column>
          <el-table-column
            prop="coreName"
            align="center"
            label="所属中心">
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
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- dialog弹窗 -->

    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="shopType_diagio">
      <el-dialog
        :visible.sync="shopShow">
        <p class="sdsd">订单详情</p>
        <div class="uers_dialog">
          <p class="uers_p">
            <span></span>
            <span>订单信息</span>
          </p>
          <p class="uers_p1">
            <span>订单号：{{Content.tradeParentId}}</span>
            <span>门店名称：{{Content.shopName}}</span>
            <span>负责人姓名：{{Content.shopUserName}}</span>
            <span>负责人手机号：{{Content.shopMobile}}</span>
            <span class="dkjfgt">门店详细地址：{{Content.shopAddress}}</span>
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
import { InterfaceDropdownList, InterfaceDropdownlastList } from '@/api/system'
// import { InterfaceQueryOrderList } from '../../api/shop'
import { InterfaceOrderList, InterfaceQueryOrderList } from '@/api/order'
export default {
  data () {
    return {
      currentPage1: 1,
      shopShow: false,
      page: '1',
      size: '10',
      total: 0,
      list: [],
      imageUrl: '',
      zhongxinList: [],
      mwndianList: [],
      Content: {},
      details: {},
      shopxContent: [],
      zhongxincang: '',
      wangdain: '',
      mendian: '',
      wangdianList: []
    }
  },
  mounted () {
    this.getzhongxincangList()
    this.getlist()
  },
  methods: {
    // 导出
    Eexport () {
      const api = 'https://test.zk020.cn/youmi-fresh/admin/order/adminExcelOrderInfo?'
      const url = api + 'orderType=3' + '&logisticsType=' + '&orderId=' + '&orderStatus=' + '&beginCreTime=' + '&endCreTime=' + '&coreShopId=' + this.zhongxincang + '&outletsShopId=' + this.wangdain + '&storeShopId=' + this.mendian
      window.location.href = url
    },
    sousuo () {
      this.getlist()
    },
    // 获取列表
    getlist () {
      InterfaceOrderList({
        orderType: 3,
        pageNo: this.page,
        pageSize: this.size,
        storeShopId: this.mendian,
        outletsShopId: this.wangdain,
        coreShopId: this.zhongxincang
      }).then(data => {
        console.log(data)
        this.list = data
      })
    },

    // 分页
    handleSizeChange (val) {
      this.size = val
      this.getlist()
    },

    handleCurrentChange (val) {
      this.page = val
      this.getlist()
    },

    // 编辑按钮
    bianji (id) {
      this.shopShow = !this.shopShow
      InterfaceQueryOrderList({
        orderId: id
      }).then(data => {
        this.Content = data[0]
        this.shopxContent = this.Content.adminGoodsList
        console.log('555', this.shopxContent)
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

    // 确定添加商品或是编辑商品
    chuangjianOver () {

    }
  }
}
</script>

<style lang="less">
  .shopType {
    .top {
      .el-select {
        height: 30px !important;
        margin-bottom: 30px;
        margin-right: 20px;
        .el-input {
          height: 30px;
          .el-input__inner {
            height: 30px;
            line-height: 30px;
          }
          .el-input__icon {
            line-height: 30px;
          }
        }
      }
    }
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
          .dkjfgt {
            // display: block;
            width: 100%;
            line-height: 25px;
          }
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
  .top {
    span {
      margin-right: 10px;
    }
    .skdjfrr {
      display: inline-block;
      width: 100px;
      height: 35px;
      background:#2B80FD;
      border-radius: 18px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #FFFFFF;
      line-height: 35px;
      text-align: center;
    }
    .skdjfrr1 {
      display: inline-block;
      width: 100px;
      height: 35px;
      background: #FF8C14;
      border-radius: 18px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #FFFFFF;
      line-height: 35px;
      text-align: center;
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
