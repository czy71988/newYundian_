<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 商品管理  商品列表</p>
      <!-- <div @click="chuangjian">创建Banner</div> -->
      <div class="BanNer_top_p">
        <span>商品标题：</span>
        <el-input v-model="getform.title" placeholder="请输入内容"></el-input>
        <span>审核状态：</span>
        <el-select v-model="getform.examineType" placeholder="请选择">
          <el-option
            v-for="item in dfgsdf"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div>
          <el-button type="primary" round  @click="sousuo">搜索</el-button>
          <el-button type="info" round>重置</el-button>
          <el-button type="warning" round>导出</el-button>
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
            prop="itemId"
            align="center"
            label="商品编号">
          </el-table-column>
          <el-table-column
            align="center"
            label="上传时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate | outtiame}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            label="商品名称">
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
            prop="storeHouse"
            align="center"
            label="商品详情图">
            <template slot-scope="scope">
              <el-image
                v-if="xiangqingtu.length > 0"
                style="width: 100px; height: 100px"
                :src="xiangqingtu[0]"
                :preview-src-list="xiangqingtu">
              </el-image>
              <span v-else @click="mokedetailsUrls(scope.row.id)">点击查看详情图</span>
            </template>
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
            prop="weight"
            align="center"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="submitAmount"
            align="center"
            label="库存数量">
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态">
            <template slot-scope="scope">
              <span>{{scope.row.examine === 1 ? '审核通过' : (scope.row.examine === 2 ? '审核拒绝' : '待审核')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inStorageAmount"
            align="center"
            label="入仓数量">
          </el-table-column>
          <el-table-column
            prop="salesAmount"
            align="center"
            label="销售数量">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.examine !== 1" class="Banner_span1" @click="bianji(scope.row)"><i class="el-icon-edit"></i>重新审核</span>
              <span v-else class="Banner_spanout"><i class="el-icon-edit"></i>重新审核</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页 -->
    <div class="bottom_bottom">
      <div @click="chuanjianshagpin" class="bottom_chuangjian"><i class="el-icon-circle-plus-outline"></i>添加商品</div>
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

    <!-- 弹窗部分 -- 商品创建编辑 -->
    <div class="BanNer_diagio">
      <el-dialog
        :before-close="jdhigjheirg"
        :visible.sync="shopShow">
        <p class="sdsd">{{biaotiname}}</p>
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
            <el-form-item label="销售价：">
              <el-input v-model="form.price"></el-input>
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
            <el-form-item label="规格：">
              <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item label="库存：">
              <el-input v-model="form.submitAmount"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="jdhigjheirg">取消</el-button>
              <el-button type="primary" @click="onSubmit">提交审核</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceAddshopdetails, InterfaceshopSohp, Interfaceshopdetails, InterfaceGoodsStyle, InterfaceGoodsUpdate } from '@/api/shop'
import { deleteElementByValue } from '@/utils/khg'
export default {
  data () {
    return {
      imgSrc: '',
      imgSrc1: '',
      deleteElementByValue,
      tableData: [],
      dialogVisible: false,
      dialogVisiblessss: false,
      shopShow: false,
      biaotiname: '',
      currentPage1: 1,
      imageUrl: '',
      dialogImageUrl: [],
      xiangqingtu: [],
      form: {
        businessId: '',
        title: '',
        mainPic: '', // 商品主图
        imageContent: [], // 商品详情图
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
        examineType: ''
      },
      dfgsdf: [
        { value: '0', label: '待审核' },
        { value: '1', label: '审核通过' },
        { value: '2', label: '审核拒绝' }
      ],
      fghty: [
        { value: '1', label: '门店' },
        { value: '2', label: '中心仓库' }
      ],
      urls: [],
      total: 0,
      list: '',
      ShopStyle: [],
      shopID: ''
    }
  },
  props: ['pagedata'],
  mounted () {
    this.getStyle()
    this.getlist()
  },
  methods: {
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
        console.log(data)
      })
    },

    // 获取列表
    getlist () {
      InterfaceshopSohp(this.getform).then(data => {
        this.tableData = data.records
        this.total = data.total
        console.log(this.tableData)
      })
    },

    // 搜索操作
    sousuo () {
      this.getlist()
    },

    // 添加商品
    chuanjianshagpin () {
      this.shopShow = !this.shopShow
      this.biaotiname = '创建商品'
    },

    // 商品编辑
    bianji (item) {
      this.biaotiname = '商品编辑'
      this.shopID = item.id
      this.jdhigjheirg()
      Interfaceshopdetails({
        id: this.shopID
      }).then(data => {
        this.form = data
        this.imageUrl = data.mainPic
        data.imageContent.forEach(item => { item.url = item.imageUrl })
        this.dialogImageUrl = data.imageContent
      })
    },

    mokedetailsUrls (id) {
      this.xiangqingtu = []
      Interfaceshopdetails({
        id: id
      }).then(data => {
        const img = data.imageContent
        const arr = []
        img.forEach(item => {
          arr.push(item.imageUrl)
        })
        this.xiangqingtu = arr
        console.log(this.xiangqingtu)
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
      if (this.biaotiname === '创建商品') {
        this.urls.forEach((item, index) => {
          this.form.imageContent.push({ sort: index, imageUrl: item.imageUrl })
        })
        InterfaceAddshopdetails(this.form).then(data => {
          this.$message({
            message: '创建商品成功',
            type: 'success'
          })
          this.getlist()
          this.jdhigjheirg()
        })
      } else {
        // 编辑操作
        InterfaceGoodsUpdate({
          id: this.shopID,
          examineType: 0,
          submitAmount: this.form.submitAmount
        }).then(data => {
          this.$message({
            message: '修改商品成功',
            type: 'success'
          })
          this.getlist()
          this.jdhigjheirg()
        })
      }
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
        font-size: 13px;
      }
      .Banner_spanout {
        color: #acacac;
        font-size: 13px;
      }
      .out {
        color: #2B80FD;
        font-size: 13px;
      }
      .out2 {
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
