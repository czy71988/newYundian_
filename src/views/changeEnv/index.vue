<!-- 签到 -->
<template>
  <div class="app-container">
    <div class="env-box">
      <p class="row"><span class="label">当前环境：</span>{{ envName }}</p>
      <el-button type="primary" @click="handleUpdateEnv">切换到{{ env === 'pre' ? '正式' : '测试' }}环境</el-button>
      <br>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['env']),
    ...mapGetters(['envName'])
  },
  methods: {
    handleUpdateEnv () {
      this.$store.commit('UPDATE_ENV', this.env === 'pre' ? 'pro' : 'pre')
      location.replace(location.origin)
    }
  }
}
</script>
<style lang="less" scoped>
.env-box {
  text-align: center;
  margin-top: 150px;
  .row {
    font-size: 24px;
    padding-bottom: 20px;
  }
  .label {
    // font-size: 30px;
    color: #525050;
  }
  .back {
    margin-top: 10px;
    width: 140px;
  }
}
</style>
