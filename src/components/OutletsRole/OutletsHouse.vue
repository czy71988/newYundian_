<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 系统设置  门店管理</p>
      <!-- <div @click="chuangjian">创建Banner</div> -->
      <div class="BanNer_top_p">
        <span>门店名称：</span>
        <el-input v-model="from.title" placeholder="请输入内容"></el-input>
        <span>手机号：</span>
        <el-input v-model="from.phone" placeholder="请输入内容"></el-input>
        <span>所属网点：</span>
        <el-select v-model="from.parentId" placeholder="请选择">
          <el-option
            label="全部"
            value="">
          </el-option>
          <el-option
            v-for="item in sdfswfsdd"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <div>
          <span style="cursor: pointer;" @click="sousupo">搜索</span>
          <span style="cursor: pointer;">批量导出</span>
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
            prop="id"
            align="center"
            label="店铺编号">
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            label="门店名称">
          </el-table-column>
          <el-table-column
            prop="managerName"
            align="center"
            label="店主姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="门店地址">
          </el-table-column>
          <el-table-column
            prop="shopH"
            align="center"
            label="经纬度">
            <template slot-scope="scope">
              <p>经度：{{scope.row.longitude}}</p>
              <p>纬度：{{scope.row.latitude}}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.gmtCreate | outtiame}}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="配送方式">
            <template slot-scope="scope">
              <p>{{scope.row.eleme === 1 ? '蜂鸟配送' : '门店配送'}}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <span style="cursor: pointer;" class="sdreg aefsdgf" @click="bianji(scope.row)"><i class="el-icon-edit"></i>编辑</span>
              <span style="cursor: pointer;" class="sdreg aefsdgf" @click="CommodityManagement(scope.row.id, scope.row.parentId)"><i class=""></i>商品管理</span>
              <span style="cursor: pointer;" class="sdreg" v-if="scope.row.state === 0" @click="shangjia(1, scope.row)"><i class="el-icon-sort"></i>上架</span>
              <span style="cursor: pointer;" class="sdreg djfruhgiio" v-else @click="shangjia(0, scope.row)"><i class="el-icon-sort"></i>下架</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页 -->
    <div class="bottom_bottom">
      <span style="cursor: pointer;" class="bottom_q" @click="news"><i class="el-icon-circle-plus-outline"></i>新增门店</span>
      <span style="cursor: pointer;" class="bottom_q"><i class="el-icon-download"></i>批量导出</span>
      <span style="cursor: pointer;" class="bottom_q"><i class="el-icon-upload2"></i>批量导入</span>
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
    <div class="ffffmendian_diagio">
      <el-dialog
        :visible.sync="dialogVisible">
        <p class="sdsd">{{biaotiname}}</p>
        <div class="chuangjian_dialog">
          <div class="gialog_tu">
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="门店名称：">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="店主姓名：">
                <el-input v-model="form.managerName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-if="biaotiname !== '新增门店'" v-model="form.phone" :disabled="true"></el-input>
                <el-input v-else v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="门店地址：">
                <el-input v-model="form.address" class="input-with-select">
                  <el-button @click="ditu" slot="append" icon="el-icon-location-information"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="经度：">
                <el-input v-model="form.longitude"></el-input>
              </el-form-item>
              <el-form-item label="纬度：">
                <el-input v-model="form.latitude"></el-input>
              </el-form-item>
              <el-form-item label="蜂鸟配送：">
                <el-tooltip :content="form.eleme === 1 ? '蜂鸟配送' : '门店配送'" placement="top">
                  <el-switch
                    v-model="form.eleme"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="所属网点：">
                <el-select v-model="form.parentId">
                  <el-option v-for="item in sdfswfsdd" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <p class="sdferg">
                <span style="cursor: pointer;" @click="dialogVisible = false">取消</span>
                <span style="cursor: pointer;" @click="over">提交</span>
              </p>
            </el-form>
          </div>
        </div>
      </el-dialog>
        <el-dialog
          width="20%"
          :visible.sync="dialogVisible1">
          <p class="dkfber">是否保存你所做的修改？</p>
          <p class="sdferg">
            <span style="cursor: pointer;" @click="dialogVisible1 = false">取消</span>
            <span style="cursor: pointer;" @click="tijiao">提交</span>
          </p>
        </el-dialog>
    </div>
    <map-selector v-model="showMapSelector" @ok="sdfgf"></map-selector>
  </div>
</template>

<script>
import { InterfaceShop, InterfaceDropdownList, InterfaceAddShop, InterfaceUpShop } from '@/api/system'
import MapSelector from '@/components/common/map-selector/MapSelector'
export default {
  components: {
    MapSelector
  },
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      biaotiname: '',
      currentPage1: 1,
      showMapSelector: false,
      sdbgg: '',
      form: {
        title: '',
        managerName: '',
        phone: '',
        address: '',
        state: 1,
        longitude: '',
        latitude: '',
        parentId: '',
        type: 2,
        eleme: 0,
        deliveryCost: '',
        idcard: '',
        idcardUrl: '',
        tyshxyDm: '',
        licenseUrl: ''
        // state: 1
      },
      dkjgbkebr: '',
      from: {
        pageNo: '1',
        pageSize: '10',
        type: 2,
        title: '',
        id: '',
        phone: '',
        parentId: '',
        state: ''
      },
      sdfswfsdd: [],
      options: [
        { value: '', label: '全部' },
        { value: '0', label: '门店配送' },
        { value: '1', label: '蜂鸟配送' }
      ],
      total: 0,
      sdjdhui: 'https://test.zk020.cn/youmi-fresh/admin/eleme/uploadFile',
      imageUrl: '',
      imageUrl1: ''
    }
  },
  mounted () {
    this.getlist()
    this.sgeugb()
  },
  methods: {
    sousupo () {
      this.getlist()
    },
    // 清空
    sjkdhg () {
      this.form = {
        title: '',
        managerName: '',
        phone: '',
        address: '',
        state: 1,
        longitude: '',
        latitude: '',
        parentId: '',
        type: 2,
        eleme: '',
        deliveryCost: ''
      }
      this.imageUrl = ''
      this.imageUrl1 = ''
    },
    // 商品管理
    CommodityManagement (id, parentId) {
      this.$router.push({ name: 'Commodi', query: { id: id, parentId: parentId } })
    },
    // 列表
    getlist () {
      InterfaceShop(this.from).then(data => {
        console.log(data)
        this.tableData = data.records
        this.total = data.total
      })
    },
    // 拉取地图
    ditu () {
      this.showMapSelector = true
    },
    sdfgf (val) {
      this.form.address = val.address
      this.form.longitude = val.location.lng
      this.form.latitude = val.location.lat
    },
    // 获取下拉列表所属网点选项
    // getType () {
    //   InterfaceDropdownList({
    //     type: 1
    //   }).then(data => {
    //     this.sjdh = data
    //   })
    // },
    sgeugb () {
      InterfaceDropdownList({
        type: 3
      }).then(data => {
        this.sdfswfsdd = data
      })
    },
    // sjferg () {
    //   InterfaceDropdownList({
    //     parentId: this.dkjgbkebr
    //   }).then(data => {
    //     this.djjgierig = data
    //   })
    // },
    // 分页
    handleSizeChange (val) {
      this.from.pageSize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.from.pageNo = val
      this.getlist()
    },
    // 编辑按钮
    bianji (item) {
      this.sjkdhg()
      this.form = item
      this.imageUrl = this.form.idcardUrl
      this.imageUrl1 = this.form.licenseUrl
      this.biaotiname = '编辑门店'
      this.dialogVisible = !this.dialogVisible
    },
    // 提交操作
    over () {
      if (this.biaotiname === '新增门店') {
        InterfaceAddShop(this.form).then(data => {
          this.$message({
            message: '新建成功',
            type: 'success'
          })
          this.getlist()
          this.dialogVisible = !this.dialogVisible
        })
      } else {
        this.dialogVisible1 = !this.dialogVisible1
      }
    },
    // 上下架操作
    shangjia (a, b) {
      b.state = a
      InterfaceUpShop(b).then(data => {
        if (a === 1) {
          this.$message({
            message: '上架成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '下架成功',
            type: 'success'
          })
        }
        this.getlist()
      })
    },
    tijiao () {
      InterfaceUpShop(this.form).then(data => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getlist()
        this.dialogVisible1 = !this.dialogVisible1
        this.dialogVisible = !this.dialogVisible
      })
    },
    // 新增按钮
    news () {
      this.sjkdhg()
      this.biaotiname = '新增门店'
      this.dialogVisible = !this.dialogVisible
    },
    // 上传身份证照片
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.idcardUrl = res.data.url
    },
    // 上传营业照片
    handleAvatarSuccess1 (res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw)
      this.form.licenseUrl = res.data.url
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

    .ffffmendian_diagio {
      .kdjgiuerg {
        .avatar-uploader {
          display: inline-block;
          margin-right: 20px;
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
          }
          .avatar {
            width: 80px;
            height: 80px;
            display: block;
          }
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
          .el-form {
            box-sizing: border-box;
            .el-form-item {
              margin-bottom: 20px;
              // height: 30px;
              // line-height: 30px;
              .el-form-item__label {
                // line-height: 30px;
              }
              .el-form-item__content {
                text-align: left;
                // height: 30px;
                // line-height: 30px;
                  width: 300px;
                .el-input__inner {
                  // line-height: 30px;
                  height: 30px;
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
.djkhgergbjdv {
  width: 100%;
  height: 100%;
}
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
      .djfruhgiio {
        color: #FF8C14;
      }
      .aefsdgf {
        margin-right: 5px;
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
      .bottom_q {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
        line-height: 17px;
        margin-right: 45px;
        line-height: 40px;
        i {
          margin-right: 10px;
        }
      }
    }
    .ffffmendian_diagio {
      .dkfber {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 70px;
        text-align: center;
      }
      .sdferg {
        text-align: center;
        padding-bottom: 30px;
        box-sizing: border-box;
        span {
          display: inline-block;
          width: 100px;
          height: 35px;
          border-radius: 18px;
          border: 1px solid #2B80FD;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #2B80FD;
          line-height: 35px;
          margin-right: 20px;
        }
        span:last-child {
          color: #FFFFFF;
          background: #2B80FD;
          margin-right: 0px;
        }
      }
      .chuangjian_dialog {
        line-height: 0;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
        .gialog_tu {
          .sdferg {
            text-align: center;
            span {
              display: inline-block;
              width: 100px;
              height: 35px;
              border-radius: 18px;
              border: 1px solid #2B80FD;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: #2B80FD;
              line-height: 35px;
              margin-right: 20px;
            }
            span:last-child {
              color: #FFFFFF;
              background: #2B80FD;
              margin-right: 0px;
            }
          }
        }
      }
    }
  }
</style>
