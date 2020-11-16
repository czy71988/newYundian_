<template>
  <div class="Commission">
    <p class="Commission_top">
      <span>· 分佣设置</span>
    </p>
    <div class="Commission_content">
      <div>
        <p>
          <span>门店分佣</span>
          <span class="Commission_show">10</span>
          <span>百分比</span>
        </p>
        <p>
          <span>网点分佣</span>
          <span class="Commission_show">10</span>
          <span>百分比</span>
        </p>
        <p>
          <span>中心分佣</span>
          <span class="Commission_show">10</span>
          <span>百分比</span>
        </p>
        <el-button @click="moke" type="primary" plain>点击编辑</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="门店分佣">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="网点分佣">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="中心分佣">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SubCommissionInformation } from '../../../api/system'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {

      }
    }
  },
  mounted () {},
  methods: {
    moke () {
      this.dialogVisible = !this.dialogVisible
    },
    handleClose () {
      this.dialogVisible = !this.dialogVisible
    },
    getList () {
      SubCommissionInformation().then(data => {
        console.log(data)
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .Commission {
    .Commission_top {
      text-align: left;
      line-height: 90px;
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #2B80FD;
      span {
        width: 7px;
        height: 7px;
        border-radius: 4px;
        margin: 0 10px;
      }
    }
    .Commission_content {
      div {
      text-align: center;
        // margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
        background-color: #F0F0F0;
        .Commission_show {
          display: inline-block;
          width: 100px;
          height: 30px;
          border: 1px solid #e3e3e3;
          margin: 0 10px;
          padding: 0 5px;
        }
        p {
          line-height: 30px;
          margin: 20px 0;
        }
      }
    }
  }
</style>
