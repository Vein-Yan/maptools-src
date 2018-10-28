<template>
  <router-link :to="link">
    <el-card shadow="hover">
      <div><i :class="classN"></i></div>
      <span class="v-label">{{label}}</span>
    </el-card>
  </router-link>
</template>

<script>
export default {
  props: ['link', 'label', 'className'],
  data(){
    return {
      classN: null
    }
  },
  created(){
    this.classN = this.className + ' ' + 'v-icon'
  }
}
</script>

<style scoped>
.v-icon{
  font-size: 40px;
}
.v-label{
  font-size: 17px;
}
</style>


