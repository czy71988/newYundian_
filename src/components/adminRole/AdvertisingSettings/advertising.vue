<template>
  <div class="BanNer">
    <!-- 头部部分 -->
    <div class="BanNer_top">
      <p>· 广告位配置  <span class="dkfbgirgasd">类目ICON配置</span></p>
      <div @click="chuangjian" style="cursor: pointer;">创建新类目</div>
    </div>
    <!-- 内容部分 -->
    <div class="BanNer_content">
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            align="center"
            label="类目名称">
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | outtiame}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            align="center"
            label="顺序">
          </el-table-column>
          <el-table-column
            prop="imageUrl"
            align="center"
            label="图片URL">
          </el-table-column>
          <el-table-column
            align="center"
            label="跳转方式">
            <template slot-scope="scope">
              <span>{{scope.row.method === 1 ? '内链跳转' : '外链跳转'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="click"
            align="center"
            label="落地页">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span style="cursor: pointer;" class="Banner_span1" @click="bianji(scope.row)"><i class="el-icon-edit"></i>编辑</span>
              <span style="cursor: pointer;" :class="scope.row.state === 1 ? 'Banner_span2' : 'Banner_span22'" @click="xiajia(scope.row)"><i class="el-icon-sort"></i>{{scope.row.state === 1 ? '下架' : '上架'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 弹窗部分 -->
    <div class="BanNer_diagio">
      <el-dialog
        :before-close="dkjfhgioer"
        :visible.sync="dialogVisible">
        <p>{{biaotiname}}</p>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="标题：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="跳转方式：">
            <el-select v-model="form.method" placeholder="请选择">
              <el-option
                v-for="item in sjdh"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片URL：">
            <el-input placeholder="请输入内容" v-model="form.imageUrl">
              <template slot="append">
                <el-upload
                  class="avatar-uploader"
                  action="https://bee.zk020.cn/bee-admin/admin/systemIndex/doUploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <i class="el-icon-upload avatar-uploader-icon"></i>
                </el-upload>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="落地页URL：">
            <el-input v-model="form.click"></el-input>
          </el-form-item>
        </el-form>
        <div class="chuangjian_dialog">
          <span style="cursor: pointer;" @click="jdhkfgbir">取消</span>
          <span style="cursor: pointer;" @click="chuangjianOver">{{Btnname}}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { InterfaceAddBanner, InterfaceUpdateBanner, InterfaceBanner } from '@/api/banner'
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      // 添加编辑的表单
      form: {
        name: '',
        imageUrl: '',
        click: '',
        sort: '',
        method: '',
        type: '2'
      },
      biaotiname: '',
      Btnname: '',
      sjdh: [
        { value: '1', label: '内链跳转' },
        { value: '2', label: '外链跳转' }
      ],
      total: 0
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    // dialog关闭前的回调函数
    dkjfhgioer () {
      // alert(11)
      this.form = {
        name: '',
        imageUrl: '',
        click: '',
        sort: '',
        method: '',
        type: '2'
      }
      this.dialogVisible = !this.dialogVisible
    },
    jdhkfgbir () {
      this.form = {
        name: '',
        imageUrl: '',
        click: '',
        sort: '',
        method: '',
        type: '2'
      }
      this.dialogVisible = !this.dialogVisible
    },
    // 获取列表
    getlist () {
      InterfaceBanner({
        type: '2'
        // pageNo: this.page,
        // pageSize: this.size
      }).then(data => {
        this.tableData = data.records
        // this.total = data.total
        console.log(data)
      })
    },
    // 上下架按钮
    xiajia (item) {
      if (item.state === 1) {
        // 下架
        InterfaceUpdateBanner({
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
        // 上架
        InterfaceUpdateBanner({
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
    },
    // 创建按钮
    chuangjian () {
      this.dialogVisible = !this.dialogVisible
      this.biaotiname = '类目创建'
      this.Btnname = '创建'
    },
    // 创建完成操作
    chuangjianOver () {
      if (this.biaotiname === '类目创建') {
        InterfaceAddBanner(this.form).then(data => {
          this.$message({
            message: '创建成功1',
            type: 'success'
          })
          this.dialogVisible = !this.dialogVisible
          this.getlist()
        })
      } else {
        InterfaceUpdateBanner(this.form).then(data => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.dialogVisible = !this.dialogVisible
          this.getlist()
        })
      }
    },
    // 编辑按钮
    bianji (row) {
      console.log(row)
      this.form = row
      this.dialogVisible = !this.dialogVisible
      this.biaotiname = '类目编辑'
      this.Btnname = '确定'
    },

    handleAvatarSuccess (res, file) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.form.imageUrl = res.data
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less">
  .BanNer {
    .BanNer_content {
      .el-table {
        line-height: 40px !important;
        border-radius: 6px 6px 0px 0px;
        overflow-y: scroll;
      }
      .el-table th, .el-table {
        background: #163D70;
        font-size: 13px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
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
    }
    .BanNer_diagio {
      .el-dialog {
        padding-bottom: 20px;
        box-sizing: border-box;
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
          p {
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
  .BanNer {
    padding: 0 15px;
    box-sizing: border-box;
    // ---------------------------
    .BanNer_top {
      position: relative;
      height: 90px;
      p {
        text-align: left;
        line-height: 90px;
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #2B80FD;
        .dkfbgirgasd {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: #2B80FD;
          margin-left: 32px;
          font-weight: 400;
        }
      }
      div {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 114px;
        height: 30px;
        background: #FF8C14;
        border-radius: 15px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 30px;
        text-align: center;
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
        color: #FF8C14;
        font-size: 13px;
      }
      .Banner_span22 {
        color: #2B80FD;
        font-size: 13px;
      }
    }
    .BanNer_diagio {
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
</style>
