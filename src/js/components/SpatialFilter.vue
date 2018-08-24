<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>空间过滤</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="tableData.length>0" class="v-table">
      <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
        <div v-for="column in tableColumns">
          <el-table-column  :prop="column" :label="column" align="left"></el-table-column>
        </div>
      </el-table>
    </div>
    <div v-if="tableData.length===0" class="v-upload">
      <el-upload class="upload-demo" drag :multiple="false" accept="text/csv" action="https://jsonplaceholder.typicode.com/posts/" :on-change=onChange>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只支持csv文件</div>
    </el-upload>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse'
export default {
  data(){
    return {
      tableColumns: null,
      tableData: []
    }
  },
  methods: {
    onChange(file) {
      Papa.parse(file.raw, {
        complete: (result) => {
          let data = result.data
          this.tableData.length = 0
          this.tableColumns = data[0]
          data.forEach((element,i) => {
            if(i === 0){
              return
            }
            let rowData = data[i],
            row = {}
            this.tableColumns.forEach((ele, idx) => {
              row[ele] = rowData[idx]
            });
            this.tableData.push(row)
          });
        }
      })
    }
  }
}
</script>

<style>
.v-table{
  margin-top: 16px;
}
.v-upload{
  margin-top: 100px;
}
</style>

