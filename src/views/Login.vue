<template>
  <div class="Login">
    <div class="Login_div">
      <p>中通云店·后台管理系统</p>
      <div class="nbvbojgo">
        <div class="Login_divs">
          <span>手机号：</span>
          <span>
            <el-input v-if="1" v-model="form.phone" placeholder="请输入账号">
            </el-input>
            <!-- <el-select v-else v-model="form.phone" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </span>
        </div>
        <div class="Login_divs">
          <span>验证码：</span>
          <span>
            <el-input placeholder="请输入内容" v-model="form.identifyCode">
            </el-input>
            <div class="shgfhir" slot="append" style="cursor: pointer;" @click="mokeOUt">{{btntxt}}</div>
          </span>
        </div>
        <div class="row">
          <!-- <div>登录即同意服务条款</div> -->
          <span class="sjknfoov">
            <!-- 11 -->
          </span>
          <span class="link-wrap" @click="onGoReg">商家用户请先
            <span class="link">注册</span>
          </span>

        </div>
        <div class="Login_btn">
          <span @click="login" style="cursor: pointer;">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yundianmoke } from '../api/login'

export default {
  data () {
    return {
      form: {
        phone: '',
        identifyCode: ''
      },
      btntxt: '获取验证码',
      time: '',
      disabled: false
      // options: [
      //   { id: 1, value: '12345678901', label: '商家账号' },
      //   { id: 2, value: '12345678902', label: '中心仓' },
      //   { id: 3, value: '12345678903', label: '网点' },
      //   { id: 4, value: '12345678904', label: '门店' },
      //   { id: 5, value: '11111111111', label: '运营' }
      // ]
    }
  },
  created () {
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
    },
    onGoReg () {
      this.$router.push({ path: '/reg' })
    },
    mokeOUt () {
      if (this.form.phone !== '' && this.disabled === false) {
        yundianmoke({
          phone: this.form.phone
        }).then(data => {
          console.log('验证码')
          this.time = 60
          this.timer()
        })
      }
    },
    // 发送手机验证码倒计时
    timer () {
      if (this.time > 0) {
        this.disabled = true
        this.time--
        this.btntxt = this.time + '秒' + '后重新发送'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '发送验证码'
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="less">
  .Login {
    .row {
      .sjknfoov {
        display: inline-block;
        width: 50%;
        text-align: left;
      }
      .link-wrap {
        display: inline-block;
        width: 50%;
        text-align: right;
        .link {
          color: blue;
          cursor: pointer;
        }
      }
    }
    .Login_div {
      div {
        span {
          .el-input {
            display: inline-block;
            width: 100%;
            .el-input__inner {
              width: 100%;
              height: 54px;
              line-height: 54px;
              font-size: 24px;
              font-family: MicrosoftYaHei;
            }
            .el-input__suffix {
              width: 40px;
              .el-input__suffix-inner {
                width: 40px;
              }
            }
          }
          input::placeholder {
            text-align: center;
            font-size: 24px;
            font-family: MicrosoftYaHei;
            color: #999999;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .Login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/编组 3@2x.png') left bottom/auto 100% no-repeat;
    .Login_div {
      width: 50%;
      float: right;
      margin-top: 200px;
      .nbvbojgo {
        width: 546px;
      }
      p {
        font-size: 36px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #2E6DE4;
        padding-left: 55px;
        box-sizing: border-box;
        margin-bottom: 70px;
      }
      .Login_divs {
        width: 546px;
        height: 54px;
        margin-bottom: 20px;
        span:first-child {
          display: inline-block;
          width: 100px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          color: #333333;
          line-height: 54px;
        }
        span:last-child {
          width: calc(100% - 100px);
          display: inline-block;
          position: relative;
          .shgfhir {
            background-color: #e3e3e3;
            padding: 0 10px;
            box-sizing: border-box;
            height: 54px;
            line-height: 54px;
            font-size: 18px;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
      .Login_btn {
        width: 546px;
        margin-top: 70px;
        span {
          display: inline-block;
          width: 270px;
          height: 55px;
          background: linear-gradient(157deg, #56B7FF 0%, #2B80FD 100%);
          border-radius: 32px;
          text-align: center;
          line-height: 55px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          color: #FFFFFF;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>
