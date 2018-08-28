<template>
  <el-container>
    <el-header>在线地理信息处理小工具</el-header>
    <el-main  ref="main">
      <router-view :mainScrollTop="scrollTop"> </router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data(){
    return {
      scrollTop: 0
    }
  },
  mounted() {
    this.$refs.main.$el.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(evt){
      this.scrollTop = evt.target.scrollTop;
    }
  }
}
</script>
<style>
body{
  margin: 4px;
}
.el-header,
.el-footer {
  background-color: #333300;
  color: #FFFFFF;
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
a{
  color: #161600
}
</style>
