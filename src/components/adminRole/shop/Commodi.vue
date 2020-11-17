<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span v-on:click="back"><i class="el-icon-back"></i>返回</span>
      <span>商品管理</span>
    </div>
    <div class="top">

      <span @click="sousuo" style="cursor: pointer;">新增商品</span>
    </div>
    <!-- 表格部分 -->
    <div class="shopType_content">
      <template>
        <el-table
          :data="list"
          stripe
          style="width: 100%"
          @selection-change="shanchuList">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            align="center"
            label="商品ID">
          </el-table-column>
          <el-table-column
            prop="itemId"
            align="center"
            label="商品编号">
          </el-table-column>
          <el-table-column
            align="center"
            label="主图">
            <template slot-scope="scope">
              <img class="sdfsgerg" :src="scope.row.mainPic" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            label="商品标题">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            align="center"
            label="所属类目">
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            label="销售价">
          </el-table-column>
          <el-table-column
            align="center"
            label="库存">
            <template slot-scope="scope">
              {{scope.row.shopAmount || '0'}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span style="cursor: pointer;" @click="remove(scope.row)">删除</span>
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
        width="90vw">
        <p class="sdsd">新增商品</p>
        <template>
          <el-table
            :data="addlist"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              align="center"
              label="商品ID">
            </el-table-column>
            <el-table-column
              align="center"
              label="主图">
              <template slot-scope="scope">
                <img class="sdfsgerg" :src="scope.row.mainPic" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              align="center"
              label="商品标题">
            </el-table-column>
            <el-table-column
              prop="price"
              align="center"
              label="销售价">
            </el-table-column>
            <el-table-column
              align="center"
              label="库存">
              <template slot-scope="scope">
                {{scope.row.amount || '0'}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-input class="djrgthnfsedsd" v-model="scope.row.buyNum" placeholder="数量"></el-input>
                <span style="cursor: pointer;" class="dlfgoerrt" @click="tijaaao(scope.row)">提交</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="bottom_bottom">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceshopSohp } from '@/api/shop'
import { InterfaceNewOrderList, InterfaceShopRemove } from '@/api/order'
export default {
  data () {
    return {
      currentPage1: 1,
      shopShow: false,
      page: '1',
      size: '10',
      total: 0,
      list: [],
      addlist: [],
      id: this.$route.query.id,
      parentId: this.$route.query.parentId,
      shopType: this.$route.query.shopType,
      add: false,
      xuanzejihe: [],
      sghadf: '',
      shanchuaddS: []
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    // 返回上一页
    back () {
      this.$router.go(-1)// 返回上一层
    },
    // 删除
    remove (val) {
      if (!this.shanchuaddS) {
        InterfaceShopRemove(this.shanchuaddS).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getlist()
          console.log(data)
        })
      } else {
        this.shanchuaddS = [
          {
            productId: val.id,
            shopId: this.id
          }
        ]
        InterfaceShopRemove(this.shanchuaddS).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.add = false
          this.getlist()
          console.log(data)
        })
      }
    },
    // 新增按钮
    sousuo () {
      this.shopShow = !this.shopShow
      this.add = true
      this.getlist()
    },
    // 获取列表
    getlist () {
      InterfaceshopSohp({
        pageNo: this.page,
        pageSize: this.size,
        shopId: this.id,
        parentShopId: this.parentId,
        add: this.add
      }).then(data => {
        if (this.add === false) {
          this.list = data.records
        } else {
          this.addlist = data.records
        }
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
    // 删除商品多选操作
    shanchuList (val) {
      this.shanchuaddS = val.map(item => {
        return {
          productId: item.id,
          shopId: this.id
        }
      })
      console.log(this.shanchuaddS)
    },
    // 新建商品多选操作
    handleSelectionChange (val) {
      this.xuanzejihe = val.map(item => {
        return {
          id: item.id,
          buyNum: item.buyNum,
          itemPrice: item.price,
          itemName: item.title,
          itemImg: item.mainPic,
          label: item.label
        }
      })
      console.log(this.xuanzejihe)
    },
    // 提交操作
    tijaaao (val) {
      this.xuanzejihe = [
        {
          id: val.id,
          buyNum: val.buyNum,
          itemPrice: val.price,
          itemName: val.title,
          itemImg: val.mainPic,
          label: val.label
        }
      ]
      InterfaceNewOrderList({
        shopId: this.id,
        remarks: '',
        shopType: this.shopType,
        items: this.xuanzejihe
      }).then(data => {
        this.$message({
          message: '恭喜你，新建成功',
          type: 'success'
        })
        this.add = false
        this.getlist()
        this.shopShow = !this.shopShow
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
      .el-input {
        width: 50%;
        margin-right: 10px;
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
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
        }
      }
      .el-form {
        padding: 30px 75px;
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
              background: #F4F4F4;
            }
          }
        }
      }
      .el-button {

      }
    }
  }
</style>

<style lang="less" scoped>
  .dlfgoerrt {
    line-height: 40px;
  }
  .sdfsgerg {
    width: 30px;
    height: 30px;
  }
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
      .chuangjian_dialog {
        line-height: 0;
        text-align: center;
        span {
          display: inline-block;
          width: 100px;
          height: 35px;
          border-radius: 18px;
          border: 1px solid #2B80FD;
          line-height: 35px;
          color: #2B80FD;
          font-size: 14px;
          font-family: MicrosoftYaHei;
        }
        span:last-child {
          margin-left: 40px;
          background: #2B80FD;
          color: #FFFFFF;
        }
      }
    }
  }
  .top {
    span {
      margin: 0 20px 20px 50px;
    }
    span:last-child {
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
  }
</style>
