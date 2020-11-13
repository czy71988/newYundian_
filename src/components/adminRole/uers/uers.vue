<template>
  <div class="shopList">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 用户管理  用户列表</p>
      <div class="BanNer_top_p">
        <span>手机号：</span>
        <el-input v-model="denglufrom.dengluphone" placeholder="请输入内容"></el-input>
        <span>是否商家：</span>
        <el-select v-model="denglufrom.role" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>选择中心仓：</span>
        <el-input v-model="denglufrom.centreName" placeholder="请输入内容"></el-input>
        <span>选择网点：</span>
        <el-input v-model="denglufrom.outletsName" placeholder="请输入内容"></el-input>
        <span>选择门店：</span>
        <el-input v-model="denglufrom.storeName" placeholder="请输入内容"></el-input>
        <div>
          <span @click="sousuo">搜索</span>
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
            label="ID">
          </el-table-column>
          <!-- <el-table-column
            prop="id"
            align="center"
            label="微信号">
          </el-table-column> -->
          <el-table-column
            align="center"
            width="100"
            label="是否商家">
            <template slot-scope="scope">
              {{scope.row.role === 0 ? '否' : '是'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            label="注册时间"
            width="240">
            <template slot-scope="scope">
              {{scope.row.gmtCreate | outtiame}}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNum"
            align="center"
            width="200"
            label="购买单数">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            align="center"
            width="200"
            label="购买总金额">
          </el-table-column>
          <el-table-column
            prop="storeName"
            align="center"
            label="所属门店">
          </el-table-column>
          <el-table-column
            prop="outletsName"
            align="center"
            label="所属网点">
          </el-table-column>
          <el-table-column
            prop="centreName"
            align="center"
            label="所属中心">
          </el-table-column>
          <el-table-column
            prop="shopName"
            align="center"
            label="用户地址">
          </el-table-column>
          <el-table-column
            align="center"
            label="禁用/启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                @change="jinyongqiyong(scope.row)"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
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
  </div>
</template>

<script>
import { UserList, UserListDisable } from '@/api/uers'
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      shopShow: false,
      biaotiname: '',
      currentPage1: 1,
      sdbgg: '',

      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      denglufrom: {
        dengluphone: '',
        pageNo: '1',
        pageSize: '10',
        storeName: '',
        outletsName: '',
        centreName: '',
        role: ''
      },
      options: [
        { value: '', label: '全部' },
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      total: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 搜索
    sousuo () {
      this.getList()
    },
    // 启用禁用
    jinyongqiyong (item) {
      if (item.enable !== 0) {
        console.log('开启')
        UserListDisable({
          id: item.id,
          enable: 1
        }).then(data => {
          this.getList()
        })
      } else {
        console.log('关闭')
        UserListDisable({
          id: item.id,
          enable: 0
        }).then(data => {
          this.getList()
        })
      }
    },
    getList () {
      UserList(this.denglufrom).then(data => {
        this.tableData = data.records
        this.total = data.total
      })
    },
    // 分页
    handleSizeChange (val) {
      this.denglufrom.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.denglufrom.pageNo = val
      this.getList()
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
  }
</style>
