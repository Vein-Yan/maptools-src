<template>
  <file-upload-tool-base :fileEncode="fileEncode"
     :tableData="tableData"
     toolName="坐标转换"
    fileUploadTip="打开需要做批量坐标转换的文件，只支持csv文件"
    @onFileReaded="onFileReaded">
    <pagination-table :tableColumns="tableColumns"
      :tableData="tableData"></pagination-table>
  </file-upload-tool-base>
</template>

<script>
import FileUploadToolBase from '@/components/page/FileUploadToolBase.vue'
import PaginationTable from '@/components/table/PaginationTable.vue'
export default {
  components: { FileUploadToolBase, PaginationTable },
  data() {
    return {
      tableColumns: null,
      tableData: null,
      originTableData: null,
      fileEncode: 'GBK'
    }
  },
  methods: {
    onFileReaded(tableColumns, tableData) {
      this.originTableData = tableData
      this.tableColumns = tableColumns
      this.tableData = tableData
    }
  }
}
</script>
