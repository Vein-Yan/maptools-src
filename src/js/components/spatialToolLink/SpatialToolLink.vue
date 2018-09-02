<template>
  <el-card shadow="hover">
    <router-link :to="link" v-html="label"></router-link>
  </el-card>
</template>

<script>
export default {
  props: ['link', 'label']
}
</script>

