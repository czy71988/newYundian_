<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 商品管理  商家商品审核</p>
      <!-- <div @click="chuangjian">创建Banner</div> -->
      <div class="BanNer_top_p">
        <span>商品标题：</span>
        <el-input v-model="getform.title" placeholder="请输入内容"></el-input>
        <span>商品标签：</span>
        <el-select v-model="getform.label" placeholder="请选择">
          <el-option
            v-for="item in dfgsdf"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div>
          <span style="cursor: pointer;" @click="sousuo">搜索</span>
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
            <!-- <template> -->
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
            prop="categoryName"
            align="center"
            label="商品类目">
          </el-table-column>
          <el-table-column
            prop="submitAmount"
            align="center"
            label="库存数量">
          </el-table-column>
          <el-table-column
            prop="weight"
            align="center"
            label="商品重量">
          </el-table-column>
          <el-table-column
            prop="weight"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span style="color: #4A4AFF; cursor: pointer;" v-if="scope.row.examine !== 1" @click="Mokeexamine(scope.row.id)">{{scope.row.examine === 0 ? '待审核' : (scope.row.examine === 1 ? '审核通过' : '审核拒绝')}}</span>
              <span style="color: #8E8E8E" v-else>{{scope.row.examine === 0 ? '待审核' : (scope.row.examine === 1 ? '审核通过' : '审核拒绝')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inStorageAmount"
            align="center"
            label="入仓数量">
          </el-table-column>
          <el-table-column
            align="center"
            label="加入商品库">
            <template slot-scope="scope">
              <span style="cursor: pointer;" class="Banner_span1" @click="bianji(scope.row)"><i class="el-icon-edit"></i>编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页 -->
    <div class="bottom_bottom">
      <!-- <div @click="chuanjianshagpin" class="bottom_chuangjian"><i class="el-icon-circle-plus-outline"></i>添加商品</div> -->
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
    <!-- 弹窗部分 -- 查看详情 -->
    <el-dialog
        width="20%"
        :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        :visible.sync="innerVisible"
        append-to-body>
        <span>选择接收数量</span>
        <el-input v-model="inStorageAmount" placeholder="请输入内容"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="Mokeexamineout">确定</el-button>
        </div>
      </el-dialog>
      <span>是否通过该商品的审核</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="OUtexamineout">拒绝审核</el-button>
        <el-button type="primary" @click="innerVisible = true">通过审核</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="BanNer_diagio">
      <el-dialog
        :before-close="jdhigjheirg"
        :visible.sync="shopShow">
        <p class="sdsd">编辑商品入库</p>
        <div class="chuangjian_shop_dialog">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品标题：">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="商品主图：">
              <el-upload
                class="avatar-uploader"
                action="https://bee.zk020.cn/bee-admin/admin/systemIndex/doUploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else class="avatar-uploader-icon">
                  <i class="el-icon-circle-plus-outline"></i><span class="sdhfhogerg" v-if="!imageUrl">点击或将图片拖拽到这里上传支持扩展名：png、jpg、jpeg</span>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="详情图：">
              <el-upload
                action="https://bee.zk020.cn/bee-admin/admin/systemIndex/doUploadFile"
                list-type="picture-card"
                :file-list="dialogImageUrl"
                :on-preview="handlePictureCardPreview"
                :on-success="dbfbiebibkfjbrgdfg"
                :on-remove="handleRemove">
                <div class="avatar-uploader-icon">
                  <i class="el-icon-circle-plus-outline"></i><span class="sdhfhogerg">点击或将图片拖拽到这里上传支持扩展名：png、jpg、jpeg</span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl.url" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="所属类目：">
              <el-select v-model="form.categoryId" placeholder="请选择活动区域">
                <el-option
                  v-for="item in ShopStyle"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售价：">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="库存数量：">
              <el-input v-model="form.submitAmount"></el-input>
            </el-form-item>
            <el-form-item label="商品重量：">
              <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{sdbgg}}</el-button>
              <el-button @click="jdhigjheirg">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import BigImg from '../../common/map-selector/BigImg'
import { InterfaceshopSohp, InterfaceGoodsShelves, Interfaceshopdetails, InterfaceGoodsUpdate, InterfaceGoodsStyle, InterfaceGoodsExamine } from '@/api/shop'
import { deleteElementByValue } from '@/utils/khg'
export default {
  data () {
    return {
      showImg: false,
      showImgq: false,
      imgSrc: '',
      imgSrc1: '',
      deleteElementByValue,
      tableData: [],
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      shopShow: false,
      currentPage1: 1,
      sdbgg: '',
      imageUrl: '',
      dialogImageUrl: [],
      form: {
        title: '',
        mainPic: '', // 商品主图
        imageContent: [], // 商品详情图
        label: '',
        storeHouse: '',
        categoryId: '',
        price: '',
        submitAmount: '',
        weight: ''
      },
      // 请求列表参数
      getform: {
        pageNo: '1',
        pageSize: '10',
        title: '',
        label: '',
        examine: true
      },
      dfgsdf: [
        { value: '隔日达', label: '隔日达' },
        { value: '当日达', label: '当日达' }
      ],
      fghty: [
        { value: '1', label: '门店' },
        { value: '2', label: '中心仓库' }
      ],
      urls: [],
      total: 0,
      list: '',
      ShopStyle: [],
      inStorageAmount: '',
      examineId: ''
    }
  },
  props: ['pagedata'],
  // components: { 'big-img': BigImg },
  mounted () {
    this.getStyle()
    this.getlist()
  },
  methods: {
    clickImg (e) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = e.currentTarget.src
    },
    // 商品审核
    Mokeexamine (id) {
      this.examineId = id
      this.outerVisible = !this.outerVisible
    },
    Mokeexamineout () {
      InterfaceGoodsExamine({
        id: this.examineId,
        examine: 1,
        inStorageAmount: this.inStorageAmount
      }).then(data => {
        this.$message('审核通过')
        this.getlist()
        this.outerVisible = !this.outerVisible
        this.innerVisible = !this.innerVisible
      })
    },
    OUtexamineout () {
      InterfaceGoodsExamine({
        id: this.examineId,
        examine: 2
      }).then(data => {
        this.$message('已拒绝')
        this.outerVisible = !this.outerVisible
        this.getlist()
      })
    },
    clickImg1 (e) {
      this.showImgq = true
      // 获取当前图片地址
      this.imgSrc1 = e.currentTarget.src
    },
    viewImg () {
      this.showImg = false
    },
    viewImg1 () {
      this.showImgq = false
    },
    // dialog关闭回调
    jdhigjheirg () {
      this.form = {
        title: '',
        mainPic: '', // 商品主图
        imageContent: [], // 商品详情图
        label: '',
        storeHouse: '',
        categoryId: '',
        price: '',
        submitAmount: '',
        weight: ''
      }
      this.urls = []
      this.imageUrl = ''
      this.dialogImageUrl = []
      this.shopShow = !this.shopShow
    },

    // 获取类目下拉列表
    getStyle () {
      InterfaceGoodsStyle({}).then(data => {
        this.ShopStyle = data
      })
    },

    // 获取列表
    getlist () {
      console.log('jjjjj')
      InterfaceshopSohp(this.getform).then(data => {
        console.log('列表', data)
        this.tableData = data.records
        this.total = data.total
      })
    },

    // 点击获取商品详情图
    DetailedDrawing (id) {
      console.log('dainji ')
      Interfaceshopdetails({
        id: id
      }).then(data => {
        this.form = data
        this.imageUrl = data.mainPic
        data.imageContent.forEach(item => { item.url = item.imageUrl })
        this.dialogImageUrl = data.imageContent
      })
    },

    // 搜索操作
    sousuo () {
      this.getlist()
    },

    // 商品编辑
    bianji (item) {
      this.sdbgg = '确定'
      const id = item.id
      this.jdhigjheirg()
      Interfaceshopdetails({
        id: id
      }).then(data => {
        this.form = data
        this.imageUrl = data.mainPic
        data.imageContent.forEach(item => { item.url = item.imageUrl })
        this.dialogImageUrl = data.imageContent
      })
    },

    // 分页
    handleSizeChange (val) {
      this.getform.pageSize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.getform.pageNo = val
      this.getlist()
    },

    // 添加按钮
    onSubmit () {
      // 编辑操作
      InterfaceGoodsUpdate(this.form).then(data => {
        this.$message({
          message: '修改商品成功',
          type: 'success'
        })
        this.getlist()
        this.jdhigjheirg()
      })
    },

    // 图片上传
    handleAvatarSuccess (res, file) {
      this.form.mainPic = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload (file) {
    },

    // 图片删除
    handleRemove (file, fileList) {
      const url = file.url
      this.form.imageContent = deleteElementByValue(this.form.imageContent, url)
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    dbfbiebibkfjbrgdfg (res, file) {
      this.urls.push({ imageUrl: res.data })
    },

    // 上下架操作
    xiajia (item) {
      if (item.state === 1) {
        // 下架操作
        InterfaceGoodsShelves({
          id: item.id,
          state: 2
        }).then(data => {
          this.$message({
            message: '下架成功',
            type: 'success'
          })
          this.getlist()
        })
      } else {
        // 上架操作
        InterfaceGoodsShelves({
          id: item.id,
          state: 1
        }).then(data => {
          this.$message({
            message: '上架成功',
            type: 'success'
          })
          this.getlist()
        })
      }
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
          position: relative;
          .el-image {
            opacity: 0;
            width: 100% !important;
            height: 100% !important;
            position: absolute;
            top: 0;
            left: 0;
            // left: 50%;
          }
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
    .BanNer_diagio {
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
          .chuangjian_shop_dialog {
            .el-form {
              padding: 30px 30px;
              box-sizing: border-box;
              .el-form-item {
                height: 100%;
                .el-form-item__content {
                  height: 100%;
                }
              }
              .sdhfhogerg {
                width: 150px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: #999999;
                line-height: 16px;
                position: absolute;
                top: 70px;
                left: 0;
              }
              .el-form-item__content {
                .el-input {
                  width: 200px;
                }
              }
               .avatar-uploader {
                  width: 150px;
                  height: 150px;
                  .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                  }
               }
                .avatar-uploader .el-upload:hover {
                  border-color: #409EFF;
                }
                .avatar-uploader-icon {
                  font-size: 28px;
                  color: #8c939d;
                  width: 150px;
                  height: 150px;
                  i {
                    margin-top: 30px;
                  }
                }

                .el-upload--picture-card {
                  line-height: 0;
                }
                .avatar {
                  width: 150px;
                  height: 150px;
                  display: block;
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
      .Banner_span1 {
        color: #2B80FD;
        margin-right: 30px;
        font-size: 13px;
      }
      .Banner_span2 {
        color: #2B80FD;
        font-size: 13px;
      }
      .Banner_span22 {
        color: #FF8C14;
        font-size: 13px;
      }
      .Banner_span3 {
        color: #2B80FD;
        margin-right: 30px;
        font-size: 13px;
      }
      .sdfsgerg {
        width: 70px;
        height: 40px;
      }
    }
    .BanNer_diagio {
      .chuangjian_dialog {
        line-height: 0;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
        .gialog_tu {
          ul {
            margin: auto;
            li {
              display: inline-block;
              margin-right: 25px;
              margin-bottom: 25px;
              img {
                width: 126px;
                height: 78px;
              }
            }
          }
          p {
            line-height: 40px;
            span {
              font-size: 13px;
              font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
              font-weight: bold;
              color: #333333;
              line-height: 17px;
              div {
                display: inline-block;
                color: #666666;
              }
            }
          }
          span {
            line-height: 40px;
            display: inline-block;
            width: 33.3%;
            font-size: 13px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #333333;
          }
        }
        .chuangjian_shop_dialog {
        }
      }
    }
    .bottom_bottom {
      height: 40px;
      padding: 0 50px;
      background: #D7E5FB;
      border-radius: 0px 0px 6px 6px;
      box-sizing: border-box;
      .bottom_chuangjian {
        display: inline-block;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #2B80FD;
        line-height: 17px;
        float: left;
        line-height: 40px;
        i {
          margin-right: 10px;
        }
      }
      .block {
        display: inline-block;
        float: right;
      }
    }
  }
</style>
