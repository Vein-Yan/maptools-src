<template>
  <div class="v-pagination-table">
    <el-table :data="currentPageData" stripe border style="width: 100%">
      <div v-for="(column,idx) in tableColumns" :key="idx">
        <el-table-column :prop="column" :label="column" align="left"></el-table-column>
      </div>
    </el-table>
    <div class="v-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :layout="layout" :total="totalLength">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tableColumns', 'tableData'],
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [10, 20, 50, 100, 150],
      pageSize: 20,
      currentPage: 1
    }
  },
  computed: {
    currentPageData() {
      let pageSize = this.pageSize,
        currentPage = this.currentPage,
        currentPageData = []
      if(!this.tableData || !this.tableColumns){
        return currentPageData
      }
      var maxIndex = this.tableData.length - 1
      let start = (currentPage - 1) * pageSize,
        end = currentPage * pageSize - 1
      end = end > maxIndex ? maxIndex : end
      for (let i = start; i <= end; i++) {
        currentPageData.push(this.tableData[i])
      }
      return currentPageData
    },
    totalLength(){
      return this.tableData && this.tableData.length || 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

