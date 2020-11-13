<template>
  <div>
    <el-container>
      <!-- 中间部分 -->
      <el-container>
        <!-- 中间左侧部分 -->
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12">
            <div class="index_top"><img src="../assets/Image 1@2x.png" alt="">
            中通云店
            </div>
<<<<<<< HEAD

            <!-- 运营后台 -->
              <el-menu
                v-if="role === 'admin'"
=======
              <el-menu
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                background-color="#202020"
                text-color="#666666"
                router
                active-text-color="#FFFFFF">

                <el-submenu index="1">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                    <span :class="index === '1' ? 'sdawe' : ''">用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/uers">用户管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 4@2x.png" alt="">
                    <span :class="index === '2' ? 'sdawe' : ''">广告配置</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/BANNER">Banner配置</el-menu-item>
                    <el-menu-item index="/advertising">类目ICON配置</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 5@2x.png" alt="">
                    <span :class="index === '3' ? 'sdawe' : ''">商品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/shopList">商品列表</el-menu-item>
                    <el-menu-item index="/shopType">商品类目创建</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 7@2x.png" alt="">
                    <span :class="index === '4' ? 'sdawe' : ''">订单管理</span>
                  </template>
                  <el-menu-item index="/uersorder">自提订单</el-menu-item>
                  <el-menu-item index="/peisongSorder">配送订单</el-menu-item>
                  <el-menu-item index="/ordergoods">订货订单</el-menu-item>
                  <el-menu-item index="/orderList">拨货订单</el-menu-item>
                </el-submenu>

                <el-submenu index="5">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 8@2x.png" alt="">
                    <span :class="index === '5' ? 'sdawe' : ''">系统设置</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/mendian">门店管理</el-menu-item>
                    <el-menu-item index="/wangidan">网点管理</el-menu-item>
                    <el-menu-item index="/zhongxin">中心仓管理</el-menu-item>
<<<<<<< HEAD
                    <el-menu-item index="/ShopStoer">商家管理</el-menu-item>
                    <el-menu-item index="/Commission">分佣设置</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>

              <!-- 门店后台 -->
              <el-menu
                v-else-if="role === 'store'"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                background-color="#202020"
                text-color="#666666"
                router
                active-text-color="#FFFFFF">

                <el-menu-item index="/home">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">首页</span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 7@2x.png" alt="">
                    <span :class="index === '2' ? 'sdawe' : ''">订单管理</span>
                  </template>
                  <el-menu-item index="/Selfdeliveryorder">自提订单</el-menu-item>
                  <el-menu-item index="/Deliveryorder">配送订单</el-menu-item>
                  <el-menu-item index="/Order">订货订单</el-menu-item>
                  <el-menu-item index="/DeliverySOrder">拨货订单</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 5@2x.png" alt="">
                    <span :class="index === '3' ? 'sdawe' : ''">商品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/ProductList">商品列表</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 8@2x.png" alt="">
                    <span :class="index === '4' ? 'sdawe' : ''">财务结算</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/FinancialSettlement">财务结算</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>

              <!-- 商家 -->
              <el-menu
                v-else-if="role === 'business'"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                background-color="#202020"
                text-color="#666666"
                router
                active-text-color="#FFFFFF">
                <el-menu-item index="/businessShopList">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/Financialsettlement">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">财务结算</span>
                </el-menu-item>
              </el-menu>

              <!-- 网点 -->
              <el-menu
                v-else-if="role === 'outlets'"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                background-color="#202020"
                text-color="#666666"
                router
                active-text-color="#FFFFFF">
                <el-submenu index="1">
                  <template slot="title">
                    <img class="dsfg" src="../assets/编组 7@2x.png" alt="">
                    <span :class="index === '2' ? 'sdawe' : ''">订单管理</span>
                  </template>
                  <el-menu-item index="/OutletsOrder">自提订单</el-menu-item>
                  <el-menu-item index="/OutletsOrders">配送订单</el-menu-item>
                </el-submenu>

                <el-menu-item index="/OutletsHouse">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">门店管理</span>
                </el-menu-item>

                <el-menu-item index="/OutletsShop">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">商品库存管理</span>
                </el-menu-item>

                <el-menu-item index="/OutletsFinance">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">财务管理</span>
                </el-menu-item>
              </el-menu>

              <!-- 中心仓 -->
              <el-menu
                v-else-if="role === 'warehouse'"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                background-color="#202020"
                text-color="#666666"
                router
                active-text-color="#FFFFFF">

                <el-menu-item index="/order">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">自提订单</span>
                </el-menu-item>

                <el-menu-item index="/orders">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">配送订单</span>
                </el-menu-item>

                <el-menu-item index="/dinghuoorder">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">订货订单</span>
                </el-menu-item>

                <el-menu-item index="/mendianguanli">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">门店管理</span>
                </el-menu-item>

                <el-menu-item index="/wangidangunali">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">网点管理</span>
                </el-menu-item>

                <el-menu-item index="/shop">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">商品列表</span>
                </el-menu-item>

                <el-menu-item index="/caiwu">
                  <img class="dsfg" src="../assets/编组 3@2x(1).png" alt="">
                  <span slot="title">财务管理</span>
                </el-menu-item>
              </el-menu>
=======
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
            </el-col>
          </el-row>
        </el-aside>
        <!-- 中间右侧部分 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <div class="right-top-fix">
      <el-button type="text" @click="onLogout">退出</el-button>
    </div>
  </div>
</template>

<script>
import { removeToken } from '../utils/auth'
import { resetRouter } from '../router'
<<<<<<< HEAD
import { mapState } from 'vuex'
=======
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
export default {
  data () {
    return {
      index: ''
    }
  },
<<<<<<< HEAD
  computed: {
    ...mapState(['role'])
  },
=======
>>>>>>> aa6bbf950d5c5185e512ca76241a306634b76293
  methods: {
    handleOpen (key, keyPath) {
      this.index = key
      console.log(this.index)
    },
    handleClose (key, keyPath) {
    },
    onLogout () {
      // 清除用户信息，重置路由，退到登录
      removeToken()
      resetRouter()
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less">
  .el-header {
    height: 120px !important;
    background-color: #202020;
    font-size: 32px;
    color: #333;
    text-align: center;
    line-height: 120px;
  }

  .el-aside {
    /* height: 100vh; */
    background-color:#202020;
    color: #333;
    /* text-align: center; */
    line-height: 200px;
    .index_top {
      height: 89px;
      background: #0D0C0C;
      line-height: 35px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: #FFFFFF;
      line-height: 89px;
      text-align: center;
      img {
        width: 55px;
        height: 35px;
        vertical-align: middle;
      }
    }
  }

  .el-container {
    /* margin-bottom: 40px; */
    height: 100vh;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
    padding: 0 !important;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-col-12 {
    width: 200px !important;
  }
  .el-menu {
    background-color: none !important;
    /* height: calc(100vh - 120px); */
  }
</style>

<style lang="less" scoped>
.dsfg {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.sdawe {
  color: #FFFFFF;
}
.right-top-fix {
  position: fixed;
  right: 0px;
  top: 0px;
  padding-right: 20px;
}
</style>
