<template>
  <div class="v-upload-tool-container">
    <breadcrumb :toolName="toolName"></breadcrumb> 
    <div v-if="tableDataNotNull" class="v-table">
      <slot></slot>
    </div>
    <div v-if="!tableDataNotNull" class="v-upload">
      <el-upload class="upload-demo" :auto-upload="false" drag :multiple="false" accept=".csv" action="https://jsonplaceholder.typicode.com/posts/" :on-change=onFileChange>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">{{fileUploadTip}}</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/page/Breadcrumb.vue'
import Util from '@/util.js'
export default {
  props: ['mainScrollTop', 'toolName', 'fileUploadTip', 'tableData', 'fileEncode'],
  components: { Breadcrumb},
  data() {
    return {
      fileName: null,
      fullscreenLoading: false,
      rawFile: null
    }
  },
  watch: {
    fileEncode() {
      this.readFile()
    }
  },
  computed: {
    tableDataNotNull() {
      return this.tableData === null ? false : true
    },
    hasData() {
      if (!this.tableData || this.tableData.length < 1) {
        return false
      }
      return true
    }
  },
  methods: {
    onFileChange(file) {
      this.fileName = file.name
      this.rawFile = file.raw
      this.readFile()
    },
    readFile() {
      Util.readCSV(this.rawFile, this.fileEncode).then(({tableColumns, tableData}) => {
        this.$emit('onFileReaded', tableColumns, tableData)
      })
    }
  }
}
</script>

<style>
.v-upload-tool-container {
  height: calc(100vh - 101px);
}
.v-table {
  margin-top: 16px;
}
.v-upload {
  margin-top: 100px;
}
.v-block {
  margin-top: 12px;
}
</style>

