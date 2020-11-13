<template>
  <div class="page register-page">
    <div class="form-wrap">
      <h1 class="title">提交资料注册成为商家</h1>
      <el-form ref="form" label-width="160px" @submit.native.prevent :rules="rules" :model="form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" @input="onNameInput"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxNum">
          <el-input v-model="form.wxNum" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入品牌名称" @input="onBrandInput"></el-input>
        </el-form-item>
        <el-form-item label="企业统一社会信用代码" prop="tyshxydm">
          <el-input v-model="form.tyshxydm"></el-input>
        </el-form-item>

        <el-form-item label="营业执照" prop="licenseUrl">
          <div class="business-license-box-wrap">
            <div class="business-license-box">
              <el-upload
                class="uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handlecardSuccess"
                :before-upload="beforecardUpload">
                <img v-if="imageUrl" :src="imageUrl" class="card">
                <i v-else class="el-icon-plus card-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="身份证" prop="idcardUrl">
          <div class="card-box-wrap">
            <div class="card-box">
              <el-upload
                class="card-uploader uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handlecardSuccess"
                :before-upload="beforecardUpload">
                <img v-if="imageUrl" :src="imageUrl" class="card">
                <i v-else class="el-icon-plus card-uploader-icon"></i>
              </el-upload>
              <div class="tip">正面</div>
            </div>
            <div class="card-box">
              <el-upload
                class="card-uploader uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handlecardSuccess"
                :before-upload="beforecardUpload">
                <img v-if="imageUrl" :src="imageUrl" class="card">
                <i v-else class="el-icon-plus card-uploader-icon"></i>
              </el-upload>
              <div class="tip">反面</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-row>
            <el-col :span="16"><el-input v-model="form.phone" placeholder="请输入手机号" @input="onPhoneInput"></el-input></el-col>
            <el-col :span="8"><div class="code-btn">获取验证码</div></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="identifyCode">
          <el-input v-model="form.identifyCode" placeholder="请输入验证码" @input="onIdentifyCodeInput"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submit" style="width:240px">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerBusiness } from '../api/uers'
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
        return
      }
      if (!/^1\d{10}/.test(value)) {
        callback(new Error('请输入正确的手机号'))
        return
      }
      callback()
    }
    return {
      form: {
        name: '',
        phone: '',
        wxNum: '',
        identifyCode: '',
        roleType: 1,
        brand: '',
        tyshxydm: '',
        licenseUrl: '',
        idcardUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        wxNum: [
          { required: true, message: '请输入微信号', trigger: 'blur' }
        ],
        identifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌名', trigger: 'blur' }
        ],
        licenseUrl: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ],
        idcardUrl: [
          { required: true, message: '请上传身份证', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      console.log(this.form)
      this.$refs.form.validate((valide) => {
        if (valide) {
          this.registerBusiness()
        }
      })
    },
    onNameInput () {
      this.form.name = this.form.name.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g, '').slice(0, 30)
    },
    onBrandInput () {
      this.form.brand = this.form.brand.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g, '').slice(0, 30)
    },
    onIdentifyCodeInput () {
      this.form.identifyCode = this.form.identifyCode.replace(/[^\d]/g, '').slice(0, 5)
    },
    onPhoneInput () {
      const phone = this.form.phone.replace(/\D/g, '')
      this.form.phone = phone.slice(0, 11)
    },
    registerBusiness () {
      const form = this.form
      registerBusiness(form).then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.page {
  width: 100%;
  background: url('../assets/编组 3@2x.png') 100% no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding-top: 30px;
  padding-bottom: 30px;
  .form-wrap {
    padding-top: 30px;
    border-radius: 6px;
    width: 600px;
    background-color: #ffffff;
    border: 1px solid #dedede;
    margin: 0 auto;
    box-sizing: border-box;
    padding-right: 120px;
    padding-left: 20px;
    .code-btn {
      text-align: center;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      border-radius: 4px;
      margin-left: 5px;
      cursor: pointer;
      &:hover{
        border-color: #409EFF;
        color:  #409EFF;
      }
    }
    .btn {
      text-align: center;
      padding-left: 120px;
      padding-bottom: 30px;
      box-sizing: border-box;
    }
    .title {
      text-align: center;
      font-size: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      padding-left: 120px;
    }
  }
  .business-license-box-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .business-license-box {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  .card-box-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card-box {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &:last-child {
        .tip {
          padding-bottom: 0px;
        }
      }
      .tip {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        padding-bottom: 10px;
      }
    }
  }
}
.register-page {
  .card-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .card-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 240px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .card {
    width: 240px;
    height: 120px;
    line-height: 120px;
    display: block;
  }
}
</style>
<style lang="less">
.register-page {
  .uploader {

    line-height: 1;
  }
  .uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

}
</style>
