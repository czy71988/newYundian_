<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  // height: 100vh;
  // width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
*{margin:0; padding:0;}

</style>
<style lang="less">
.el-image-viewer__wrapper {
  .el-icon-circle-close:before {
    color: #FFFFFF;
  }
}
</style>
<style lang="less">
.display-table {
  box-sizing: border-box;
  padding: 12px;
  .el-table {
    border-radius: 6px 6px 0px 0px;
    overflow: hidden;
  }
  .el-table th, .el-table {
    background: #163D70;
    font-size: 13px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
  }
  .el-table th tr, .el-table tr {
    color: #333333;
    font-weight: 400;
    font-family: MicrosoftYaHei;
    background-color: #E6EEFD;
  }
  .el-table th .el-table__row--striped, .el-table .el-table__row--striped {
    background-color: #D7E5FB;
  }
}
</style>
