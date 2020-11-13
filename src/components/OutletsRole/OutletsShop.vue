<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 商品管理  商品列表</p>
      <div class="BanNer_top_p">
        <span>商品编号：</span>
        <el-input v-model="getform.itemId" placeholder="请输入内容"></el-input>
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
  </div>
</template>

<script>
import { InterfaceshopSohp, Interfaceshopdetails } from '@/api/shop'
export default {
  data () {
    return {
      tableData: [],
      currentPage1: 1,
      xiangqingtu: [],
      // 请求列表参数
      getform: {
        pageNo: '1',
        pageSize: '10',
        title: '',
        itemId: ''
      },
      total: 0
    }
  },
  props: ['pagedata'],
  mounted () {
    this.getlist()
  },
  methods: {

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

    // 点击查看详情图
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
      // .Banner_span1 {
      //   color: #2B80FD;
      //   font-size: 13px;
      // }
      // .Banner_spanout {
      //   color: #acacac;
      //   font-size: 13px;
      // }
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
      .block {
        display: inline-block;
        float: right;
      }
    }
  }
</style>
