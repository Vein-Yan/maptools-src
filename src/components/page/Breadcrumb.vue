<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{toolName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ['toolName']
}
</script>

