<template>
  <div class="page register-page">
    <div class="form-wrap">
      <h1 class="title">提交资料注册成为商家</h1>
      <el-form ref="form" label-width="167px" @submit.native.prevent :rules="rules" :model="form">
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
                :action="uploadAction"
                :show-file-list="false"
                accept="image/png,image/jpeg"
                :on-error="(err, file) => onUploadFileError('businessLicense', err, file)"
                :on-success="(res, file) => onUploadFileSuccess('businessLicense', res, file)"
                :before-upload="(file) => beforeFileUpload('businessLicense', file)">
                <img v-if="form.licenseUrl" :src="form.licenseUrl" class="business-license">
                <i v-else class="el-icon-plus business-license-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="身份证" prop="idcardUrl">
          <div class="card-box-wrap">
            <div class="card-box">
              <el-upload
                class="card-uploader uploader"
                :action="uploadAction"
                accept="image/png,image/jpeg"
                :show-file-list="false"
                :on-error="(err, file) => onUploadFileError('cardFront', err, file)"
                :on-success="(res, file) => onUploadFileSuccess('cardFront', res, file)"
                :before-upload="(file) => beforeFileUpload('cardFront', file)">
                <img v-if="cardImgUrl.cardFront" :src="cardImgUrl.cardFront" class="card">
                <i v-else class="el-icon-plus card-uploader-icon"></i>
              </el-upload>
              <div class="tip">正面</div>
            </div>
            <div class="card-box">
              <el-upload
                class="card-uploader uploader"
                accept="image/png,image/jpeg"
                :action="uploadAction"
                :show-file-list="false"
                :on-error="(err, file) => onUploadFileError('cardBack', err, file)"
                :on-success="(res, file) => onUploadFileSuccess('cardBack', res, file)"
                :before-upload="(file) => beforeFileUpload('cardBack', file)">
                <img v-if="cardImgUrl.cardBack" :src="cardImgUrl.cardBack" class="card">
                <i v-else class="el-icon-plus card-uploader-icon"></i>
              </el-upload>
              <div class="tip">反面</div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-row>
            <el-col :span="15"><el-input v-model="form.phone" placeholder="请输入手机号" @input="onPhoneInput"></el-input></el-col>
            <el-col :span="9"><el-button class="code-btn" type="primary" :loading="isGettingCode" @click="onGetCode">{{codeBtnLabel}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="identifyCode">
          <el-input v-model="form.identifyCode" placeholder="请输入验证码" @input="onIdentifyCodeInput"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submit" style="width:240px">注册</el-button>
          <p>已有账号，前往<span style="cursor: pointer;" @click="moke">登录</span></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerBusiness } from '../api/uers'
import { yundianmoke } from '../api/login'
import { reqConfig } from '../utils/config'
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
      uploadAction: reqConfig.uploadUrl,
      cardImgUrl: {
        cardBack: '',
        cardFront: ''
      },
      nihao: 'nih',
      codeBtnLabel: '获取验证码',
      isGettingCode: false, // 是否正在获取验证码
      getCodeBtnLabel: '获取验证码', // 获取验证码的label
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
        tyshxydm: [
          { required: true, message: '请输入企业统一社会信用代码', trigger: 'blur' }
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
  watch: {
    cardImgUrl (val) {
      const { cardFront, cardBack } = val
      if (cardFront && cardBack) {
        this.form.idcardUrl = `${cardFront},${cardBack}`
      } else {
        this.form.idcardUrl = ''
      }
    }
  },
  created () {

  },
  methods: {
    onNameInput () {
      this.form.name = this.form.name.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g, '').slice(0, 30)
    },
    onBrandInput () {
      this.form.brand = this.form.brand.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g, '').slice(0, 30)
    },
    onIdentifyCodeInput () {
      this.form.identifyCode = this.form.identifyCode.replace(/[^\d]/g, '').slice(0, 6)
    },
    onPhoneInput () {
      const phone = this.form.phone.replace(/\D/g, '')
      this.form.phone = phone.slice(0, 11)
    },
    // 检查手机号码
    checkPhone () {
      const phone = this.form.phone
      if (!phone) {
        this.$message({
          type: 'error',
          message: '请先输入手机号'
        })
        return false
      }
      if (!/^1\d{10}/.test(phone)) {
        this.$message({
          type: 'error',
          message: '手机号不正确'
        })
        return false
      }
      return true
    },
    // 获取验证码
    onGetCode () {
      if (!this.checkPhone()) {
        return
      }
      if (this.isGettingCode || this.countDowning) {
        return
      }
      this.isGettingCode = true
      this.codeBtnLabel = '获取中'

      // 获取验证码
      yundianmoke({
        phone: this.form.phone
      }, false).then(data => {
        this.isGettingCode = false
        this.countDowning = true
        this._time = 60
        this.codeBtnLabel = `${60}s重新获取`
        this.countDown()
      }).catch((err) => {
        this.codeBtnLabel = '重新获取'
        this.isGettingCode = false
        this.$message.error('获取验证码失败，' + err.message)
      })
    },
    moke () {
      this.$router.push({ path: '/login' })
    },
    countDown () {
      const time = this._time
      this._timeId = setTimeout(() => {
        this._time = time - 1
        if (time < 0) {
          this.countDowning = false
          this.codeBtnLabel = '重新获取'
          clearTimeout(this._timeId)
        } else {
          this.codeBtnLabel = `${time}s重新获取`
          this.countDown()
        }
      }, 1000)
    },
    // 检查文件是否符合上传类型
    checkUploadFileType (fileType, typeWhiteList) {
      for (let i = 0, len = typeWhiteList.length; i < len; i++) {
        const type = typeWhiteList[i]
        if (fileType.indexOf(type) > -1) return true
      }
      return false
    },
    // 上传文件之前
    beforeFileUpload (type, file) {
      if (!this.checkUploadFileType(file.type, ['png', 'jpg', 'jpeg'])) {
        this.$message({
          message: '请上传png，jpg格式文件',
          type: 'error'
        })
        return false
      }
    },
    // 文件上传失败
    onUploadFileError (type, error, file) {
      this.$message.error('上传失败,请重新上传')
    },
    // 文件上传成功
    onUploadFileSuccess (type, res, file) {
      this.$message.success('上传成功')
      const fileUrl = res.data
      if (type === 'businessLicense') {
        this.form.licenseUrl = fileUrl
      } else {
        this.cardImgUrl = Object.assign({}, this.cardImgUrl, {
          [type]: fileUrl
        })
      }
    },
    // 提交
    submit () {
      this.$refs.form.validate((valide) => {
        if (valide) {
          this.registerBusiness()
        }
      })
    },
    // 注册
    registerBusiness () {
      if (this._registing) return
      this._registing = true
      const form = this.form
      registerBusiness(form, false).then(data => {
        this.$alert('点击确认，赶快登录吧', '注册成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.replace('/login')
          }
        })
        this._registing = false
      }).catch(err => {
        this.$message.error('注册失败,' + err.message)
        this._registing = false
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
    width: 620px;
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
      padding-left: 18px;
      width: 100%;
      padding-right: 18px;
      cursor: pointer;
      height: 100%;
    }
    .btn {
      text-align: center;
      padding-left: 120px;
      padding-bottom: 30px;
      box-sizing: border-box;
      p {
        font-size: 12px;
        line-height: 30px;
        span {
          color: #409EFF;
        }
      }
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
  .card-uploader-icon, .business-license-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 240px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .card, .business-license {
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
