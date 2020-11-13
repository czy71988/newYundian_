<template>
<<<<<<< HEAD
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 商品管理  商品列表</p>
      <!-- <div @click="chuangjian">创建Banner</div> -->
      <div class="BanNer_top_p">
        <span>商品编号：</span>
        <el-input v-model="getform.title" placeholder="请输入内容"></el-input>
        <span>商品标题：</span>
        <el-input v-model="getform.title" placeholder="请输入内容"></el-input>
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
            prop="title"
            align="center"
            label="商品名称">
          </el-table-column>
          <!-- <el-table-column
            prop="gmtCreate"
            align="center"
            label="上传时间">
          </el-table-column> -->
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
            label="商品重量">
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="库存数量">
          </el-table-column>
          <!-- <el-table-column
            prop="amount"
            align="center"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="入仓数量">
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="销售数量">
          </el-table-column> -->
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span class="Banner_span1" @click="bianji(scope.row)"><i class="el-icon-edit"></i>重新审核</span>
              <span class="Banner_spanout" @click="bianji(scope.row)"><i class="el-icon-edit"></i>重新审核</span>
=======
  <div class="shopType">
    <!-- 商品类目创建头部 -->
    <div class="shopType_top">
      <span>· 首页</span>
      <span>首页</span>
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
            label="操作时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate}}</span>
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
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
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
<<<<<<< HEAD
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
              <el-input v-model="form.amount"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="jdhigjheirg">取消</el-button>
            </el-form-item>
          </el-form>
=======
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
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { InterfaceshopSohp, Interfaceshopdetails, InterfaceGoodsStyle } from '@/api/shop'
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
        title: '',
        mainPic: '', // 商品主图
        imageContent: [], // 商品详情图
        label: '',
        storeHouse: '',
        categoryId: '',
        price: '',
        amount: '',
        weight: ''
      },
      // 请求列表参数
      getform: {
        pageNo: '1',
        pageSize: '10',
        title: '',
        label: ''
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
      ShopStyle: []
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
        amount: '',
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
      })
    },

    // 搜索操作
    sousuo () {
      this.getlist()
    },

    // 添加商品
    // chuanjianshagpin () {
    //   this.shopShow = !this.shopShow
    //   this.biaotiname = '创建商品'
    // },

    // 商品编辑
    bianji (item) {
      this.biaotiname = '商品编辑'
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
    // onSubmit () {
    //   if (this.biaotiname === '创建商品') {
    //     this.urls.forEach((item, index) => {
    //       this.form.imageContent.push({ sort: index, imageUrl: item.imageUrl })
    //     })
    //     InterfaceAddshopdetails(this.form).then(data => {
    //       this.$message({
    //         message: '创建商品成功',
    //         type: 'success'
    //       })
    //       this.getlist()
    //       this.jdhigjheirg()
    //     })
    //   } else {
    //     // 编辑操作
    //     InterfaceGoodsUpdate(this.form).then(data => {
    //       this.$message({
    //         message: '修改商品成功',
    //         type: 'success'
    //       })
    //       this.getlist()
    //       this.jdhigjheirg()
    //     })
    //   }
    // },

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
=======
export default {
  data () {
    return {
      shopxContent: [],
      list: []
    }
  },
  mounted () {
  },
  methods: {
    // 分页
    handleSizeChange (val) {},
    handleCurrentChange (val) {}

>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  }
}
</script>

<style lang="less">
<<<<<<< HEAD
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
=======
  .shopType {
    .shopType_content {
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
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
<<<<<<< HEAD
    .BanNer_diagio {
=======
    .shopType_diagio {
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
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
<<<<<<< HEAD
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
=======
          .el-form {
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
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
<<<<<<< HEAD
=======
                  width: 300px;
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
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
<<<<<<< HEAD
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
=======
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
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #2B80FD;
<<<<<<< HEAD
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
=======
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
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
      }
    }
    .bottom_bottom {
      height: 40px;
      padding: 0 50px;
      background: #D7E5FB;
      border-radius: 0px 0px 6px 6px;
      box-sizing: border-box;
<<<<<<< HEAD
      // .bottom_chuangjian {
      //   display: inline-block;
      //   font-size: 13px;
      //   font-family: MicrosoftYaHei;
      //   color: #2B80FD;
      //   line-height: 17px;
      //   float: left;
      //   line-height: 40px;
      //   i {
      //     margin-right: 10px;
      //   }
      // }
=======
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
      .block {
        display: inline-block;
        float: right;
      }
    }
<<<<<<< HEAD
=======
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
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  }
</style>
