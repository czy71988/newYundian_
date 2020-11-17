<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 系统设置  商家管理</p>
      <div class="BanNer_top_p">
        <span>商家名称：</span>
        <el-input v-model="from.name" placeholder="请输入内容"></el-input>
        <span>手机号：</span>
        <el-input v-model="from.phone" placeholder="请输入内容"></el-input>
        <div>
          <span @click="sousupo">搜索</span>
          <span>批量导出</span>
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
            label="商家ID">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="wxNum"
            align="center"
            label="微信号">
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="brand"
            align="center"
            label="品牌名称">
          </el-table-column>
          <el-table-column
            align="center"
            label="身份证照片">
            <template slot-scope="scope">
              <img class="djkhgergbjdv" :src="scope.row.idcardUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="营业执照照片">
            <template slot-scope="scope">
              <img class="djkhgergbjdv" :src="scope.row.licenseUrl" alt="">
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页 -->
    <div class="bottom_bottom">
      <span class="bottom_q"><i class="el-icon-download"></i>批量导出</span>
      <span class="bottom_q"><i class="el-icon-upload2"></i>批量导入</span>
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
import { BusinessManagement } from '@/api/shop'
export default {
  data () {
    return {
      tableData: [],
      currentPage1: 1,
      from: {
        pageNo: '1',
        pageSize: '10',
        name: '',
        phone: ''
      },
      total: 0
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    sousupo () {
      this.getlist()
    },
    getlist () {
      BusinessManagement(this.from).then(data => {
        console.log('商家管理列表', data)
        this.tableData = data.records
        this.total = data.total
      })
    },

    // 分页
    handleSizeChange (val) {
      this.from.pageSize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.from.pageNo = val
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
      // .sdreg {
      //   font-size: 13px;
      //   font-family: MicrosoftYaHei;
      //   color: #2B80FD;
      //   line-height: 17px;
      // }
      // .djfruhgiio {
      //   color: #FF8C14;
      // }
      // .aefsdgf {
      //   margin-right: 5px;
      // }
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

  }
</style>
