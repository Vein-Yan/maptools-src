<template>
  <div class="v-visualization-container">
    <file-upload-tool-base :fileEncode="fileEncode"
      :tableData="tableData"
      toolName="空间数据可视化"
      fileUploadTip="打开需要空间可视化的文件，只支持csv文件，并且需要包含wkt空间字段"
      @onFileReaded="onFileReaded">
      <visual-map mapId="visualMap"
        spatialColumn="wkt"
        :tableColumns="tableColumns"
        :tableData="tableData"></visual-map>
    </file-upload-tool-base>
  </div>
</template>

<script>
import FileUploadToolBase from '@/components/page/FileUploadToolBase.vue'
import VisualMap from '@/components/map/VisualMap.vue'
export default {
  components: {
    FileUploadToolBase,
    VisualMap
  },
  data() {
    return {
      fileEncode: 'GBK',
      tableColumns: null,
      tableData: null
    }
  },
  methods: {
    onFileReaded(tableColumns, tableData) {
      this.tableColumns = tableColumns
      this.tableData = tableData
    }
  }
}
</script>

