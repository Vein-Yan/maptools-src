<template>
  <el-container>
    <el-header>在线地理信息处理小工具</el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
{
  data: null
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 45px;
}
.el-header {
  text-align: left;
  height: 45px !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 61px);
}
</style>
