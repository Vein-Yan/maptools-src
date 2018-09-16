<template>
  <file-upload-tool-base :fileEncode="fileEncode" :tableColumns="tableColumns" :tableData="tableData" toolName="坐标转换" fileUploadTip="打开需要做批量坐标转换的文件，只支持csv文件" @onFileReaded="onFileReaded">
    
  </file-upload-tool-base>
</template>

<script>
import FileUploadToolBase from '@component/page/FileUploadToolBase.vue'
export default {
  components: { FileUploadToolBase },
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
