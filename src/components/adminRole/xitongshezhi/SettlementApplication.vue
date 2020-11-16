<template>
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 财务结算</span>
      <span>财务结算</span>
    </div>
    <div class="top">
      <el-form ref="form" :model="outfrom" label-width="100px">
        <el-form-item label="审核结果">
          <el-select v-model="outfrom.status" placeholder="请选择活动区域">
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核拒绝" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否已打款">
          <el-select v-model="outfrom.isSettle" placeholder="请选择活动区域">
            <el-option label="已结算" value="0"></el-option>
            <el-option label="未结算" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
            prop="id"
            align="center"
            label="订单编号">
          </el-table-column>
          <el-table-column
            prop="applyName"
            align="center"
            label="申请商家姓名">
          </el-table-column>
          <el-table-column
            prop="applyPhone"
            align="center"
            label="申请商家手机号">
          </el-table-column>
          <el-table-column
            align="center"
            label="申请日期">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate.substring(0, 19)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyPhone"
            align="center"
            label="申请结算金额">
          </el-table-column>
          <el-table-column
            align="center"
            label="审核操作">
            <template slot-scope="scope">
              <span v-if="scope.row.status !== '审核通过'" @click="moke(scope.row.id)">{{scope.row.status}}</span>
              <span v-else>{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="logisticsNum"
            align="center"
            label="物流单号">
          </el-table-column>
          <el-table-column
            align="center"
            label="打印凭证">
            <template slot-scope="scope">
              <img class="imgupdate" v-if="scope.row.paymentVoucher !== '' && scope.row.paymentVoucher !== null" :src="scope.row.paymentVoucher" alt="">
              <span v-else>
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  action="https://bee.zk020.cn/bee-admin/admin/systemIndex/doUploadFile"
                  :on-success="function (res, file) { return handleAvatarSuccess(res, file, scope.row.id)}"
                  :before-upload="beforeAvatarUpload">
                  <i class="el-icon-plus avatar-uploader-icon">点击上传</i>
                </el-upload>
              </span>
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
        <div class="uers_dialog">
          <p>商家结算是否通过审核</p>
          <el-button @click="out" type="primary" plain>通过审核</el-button>
          <el-button @click="Reout" type="info" plain>拒绝审核</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { SettlementApplication, SettlementApplicationOut, SettlementApplicationReOut, UploadVoucher } from '../../../api/order'
export default {
  data () {
    return {
      currentPage1: 1,
      list: [],
      outfrom: {
        orderType: 2,
        pageNo: '1',
        pageSize: '10',
        status: '',
        isSettle: ''
      },
      // time: '',
      shopShow: false,
      ids: '',
      total: 0,
      imageUrl: '',
      imgID: ''
    }
  },
  mounted () {
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
    getList () {
      SettlementApplication(this.outfrom).then(data => {
        console.log('列表', data)
        this.list = data
        this.total = this.list[0].totalCount || 0
      })
    },
    sousuo () {
      this.getList()
    },
    moke (id) {
      this.ids = id
      this.shopShow = !this.shopShow
    },
    out () {
      SettlementApplicationOut({
        id: this.ids
      }).then(data => {
        this.$message('审核已通过')
        this.getList()
      })
    },
    Reout () {
      SettlementApplicationReOut({
        id: this.ids
      }).then(data => {
        this.$message('审核已拒绝')
        this.getList()
      })
    },
    uploadH () {
      UploadVoucher({
        id: this.imgID,
        paymentVoucher: this.imageUrl
      }).then(data => {
        this.getList()
      })
    },
    handleAvatarSuccess (res, file, id) {
      this.imgID = id
      this.imageUrl = res.data
      this.uploadH()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
      .el-form-item {
        display: inline-block;
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
      .imgupdate {
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
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        padding: 20px 0;
        box-sizing: border-box;
        P {
          line-height: 90PX;
          font-size: 20PX;
          text-align: center;
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
