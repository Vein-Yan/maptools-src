<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>空间过滤</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload class="upload-demo" 
    drag 
     multiple
     :on-change=onChange
     >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只支持csv文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  methods:{
    onChange(){
      debugger
    }
  }
}
</script>
