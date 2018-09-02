<template>
  <div class="v-upload-tool-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{toolName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="tableDataNotNull" class="v-table">
      <slot></slot>
      <pagination-table :tableColumns="tableColumns" :tableData="tableData"></pagination-table>
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
import PaginationTable from '@component/page/PaginationTable.vue'
import Util from '@/js/util.js'
export default {
  props: ['mainScrollTop', 'toolName', 'fileUploadTip'],
  components: { PaginationTable },
  data() {
    return {
      tableColumns: null,
      tableData: null,
      originTableData: null,
      fileName: null,
      fullscreenLoading: false,
      fileEncode: 'GBK',
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
        this.tableColumns = tableColumns
        this.originTableData = tableData
        this.tableData = tableData
      })
    },
    handleOutputBtnClick() {
      let fileName = this.fileName.replace(/\.csv$/, '')
      fileName = `${fileName + '_filter_' + new Date().getTime()}.csv`
      Util.outputCSV(this.tableColumns, this.tableData, fileName)
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

