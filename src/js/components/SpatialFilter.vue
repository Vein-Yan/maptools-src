<template>
  <div class="v-spatial-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>空间过滤</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="tableData.length>0" class="v-table">
      <div class="v-filter-btn-container">
        <el-button class="v-filter-btn" type="primary" icon="fa fa-filter" round @click="handleFilterBtnClick">空间过滤</el-button>
        <el-tooltip v-if="scrollTop > 100" class="v-filter-btn-circle" content="空间过滤" placement="right">
          <el-button type="primary" icon="fa fa-filter" circle @click="handleFilterBtnClick"></el-button>
        </el-tooltip>
      </div>
      <el-table :data="currentPageData" stripe border style="width: 100%">
        <div v-for="column in tableColumns">
          <el-table-column :prop="column" :label="column" align="left"></el-table-column>
        </div>
      </el-table>
      <div class="v-block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>
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
    <el-dialog title="空间过滤属性设置" :visible.sync="dialogVisible" width="50%" :before-close="handleDialogClose">
      <spatial-filter-settings></spatial-filter-settings>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">开始过滤</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Papa from 'papaparse'
import SpatialFilterSettings from './spatialFilter/SpatialFilterSettings.vue'
export default {
  props: ['mainScrollTop'],
  components: {SpatialFilterSettings},
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      tableColumns: null,
      tableData: []
    }
  },
  computed: {
    currentPageData() {
      let pageSize = this.pageSize,
        currentPage = this.currentPage
      let currentPageData = []
      var maxIndex = this.tableData.length - 1
      let start = (currentPage - 1) * pageSize,
        end = currentPage * pageSize - 1
      end = end > maxIndex ? maxIndex : end
      for (let i = start; i <= end; i++) {
        currentPageData.push(this.tableData[i])
      }
      return currentPageData
    },
    scrollTop() {
      return this.mainScrollTop
    }
  },
  methods: {
    onChange(file) {
      Papa.parse(file.raw, {
        complete: result => {
          let data = result.data
          this.tableData.length = 0
          this.tableColumns = data[0]
          data.forEach((element, i) => {
            if (i === 0) {
              return
            }
            let rowData = data[i],
              row = {}
            this.tableColumns.forEach((ele, idx) => {
              row[ele] = rowData[idx]
            })
            this.tableData.push(row)
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleFilterBtnClick() {
      console.log('filterBtnClick')
      this.dialogVisible = true;
    },
    handleDialogClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }
}
</script>

<style>
.v-spatial-container {
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
.v-filter-btn-container {
  text-align: right;
}
.v-filter-btn {
  position: relative;
  top: -16px;
}
.v-filter-btn-circle {
  position: absolute;
  top: 87px;
  right: 123px;
  z-index: 99;
}
</style>

