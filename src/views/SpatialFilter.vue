<template>
  <div class="v-spatial-container">
    <file-upload-tool-base :fileEncode="fileEncode"
      :tableData="tableData"
      toolName="空间过滤"
      fileUploadTip="打开需要做空间过滤的文件，只支持csv文件"
      @onFileReaded="onFileReaded">
      <div class="v-tool-btn-container">
        <el-tooltip class="v-btn v-filter-btn"
          content="空间过滤"
          placement="top">
          <el-button type="primary"
            icon="fa fa-filter"
            round
            @click="handleFilterBtnClick"></el-button>
        </el-tooltip>
        <el-tooltip v-if="scrollTop > 80"
          class="v-filter-btn-circle"
          content="空间过滤"
          placement="right">
          <el-button type="primary"
            icon="fa fa-filter"
            circle
            @click="handleFilterBtnClick"></el-button>
        </el-tooltip>
        <el-tooltip class="v-btn v-map-btn"
          content="地图显示"
          placement="top">
          <el-button type="primary"
            icon="fa fa-map"
            :disabled="tableData && tableData.length > 50000"
            round
            @click="handleMapBtnClick"></el-button>
        </el-tooltip>
        <el-tooltip class="v-btn v-output-btn"
          content="导出CSV"
          placement="top">
          <el-button type="primary"
            icon="fa fa-download"
            :disabled="tableData && tableData.length > 50000"
            round
            @click="handleOutputBtnClick"></el-button>
        </el-tooltip>
        <el-tooltip class="v-btn v-origin-btn"
          content="原数据"
          placement="top">
          <el-button type="primary"
            icon="fa fa-rotate-left"
            :disabled="tableData === originTableData"
            round
            @click="handleOriginBtnClick"></el-button>
        </el-tooltip>
        <el-tooltip class="v-btn v-clear-btn"
          content="清空"
          placement="top">
          <el-button type="primary"
            icon="fa fa-trash"
            round
            @click="handleClearBtnClick"></el-button>
        </el-tooltip>
        <el-select class="v-file-encode-select"
          v-model="fileEncode"
          placeholder="请选择">
          <el-option label="GBK"
            value="GBK"></el-option>
          <el-option label="UTF8"
            value="UTF8"></el-option>
        </el-select>
      </div>
      <pagination-table :tableColumns="tableColumns"
        :tableData="tableData"></pagination-table>
    </file-upload-tool-base>
    <el-dialog title="空间过滤属性设置"
      :visible.sync="settingDialogVisible"
      width="50%">
      <spatial-filter-settings ref='spatialfilterSettings'
        :tableColumns="tableColumns"></spatial-filter-settings>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="settingDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          v-loading.fullscreen.lock="fullscreenLoading"
          @click="handleBeginFilterBtnClick">开始过滤</el-button>
      </span>
    </el-dialog>
    <el-dialog title="空间字段选择"
      :visible.sync="lonlatDialogVisible"
      width="40%">
      <lon-lat-form ref="lonLatForm"
        :tableColumns="tableColumns"></lon-lat-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="lonlatDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          v-loading.fullscreen.lock="fullscreenLoading"
          @click="handleSelectLonLatBtnClick">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="地图显示"
      :visible.sync="mapDialogVisible"
      width="90%">
      <el-select class="v-label-select"
        v-model="labelColumn"
        filterable
        size="mini"
        placeholder="请选择">
        <el-option v-for="item in labelColumns"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <table-map ref="tableMap"
        mapId="tableMap"
        :tableData="tableData"
        :Xcolumn="Xcolumn"
        :Ycolumn="Ycolumn"
        :labelColumn="labelColumn"
        :loadCount="loadMapCount"></table-map>
    </el-dialog>
  </div>
</template>

<script>
import GeoJSON from 'ol/format/GeoJSON.js'
import Util from '@/util.js'
import SpatialFilterSettings from '@/components/spatialFilter/SpatialFilterSettings.vue'
import FileUploadToolBase from '@/components/page/FileUploadToolBase.vue'
import PaginationTable from '@/components/table/PaginationTable.vue'
import LonLatForm from '@/components/form/LonLatForm.vue'
import TableMap from '@/components/map/TableMap.vue'
export default {
  props: ['mainScrollTop'],
  components: {
    FileUploadToolBase,
    PaginationTable,
    SpatialFilterSettings,
    LonLatForm,
    TableMap
  },
  data() {
    return {
      lonlatDialogVisible: false,
      settingDialogVisible: false,
      mapDialogVisible: false,
      tableColumns: null,
      tableData: null,
      originTableData: null,
      fullscreenLoading: false,
      Xcolumn: null,
      Ycolumn: null,
      labelColumn: null,
      loadMapCount: 0,
      fileEncode: 'GBK'
    }
  },
  computed: {
    scrollTop() {
      return this.mainScrollTop
    },
    labelColumns() {
      let columns = []
      this.tableColumns &&
        this.tableColumns.forEach(val => {
          let column = {
            label: val,
            value: val
          }
          columns.push(column)
        })
      return columns
    }
  },
  methods: {
    onFileReaded(tableColumns, tableData) {
      this.originTableData = tableData
      this.tableColumns = tableColumns
      this.tableData = tableData
    },
    handleOutputBtnClick() {
      let fileName = this.fileName.replace(/\.csv$/, '')
      fileName = `${fileName + '_filter_' + new Date().getTime()}.csv`
      Util.outputCSV(this.tableColumns, this.tableData, fileName)
    },
    handleFilterBtnClick() {
      if (!this.tableData || this.tableData.length < 1) {
        this.$message({
          message: '没有可过滤的数据',
          type: 'warning'
        })
      }
      this.settingDialogVisible = true
    },
    handleBeginFilterBtnClick() {
      this.fullscreenLoading = true
      let spatialfilterSettings = this.$refs.spatialfilterSettings
      let filterType = spatialfilterSettings.filterType
      let settings = spatialfilterSettings.settings[filterType]
      if (filterType !== 'customize' && settings.selectedData.length < 1) {
        this.$message.error(
          '请选择' + (filterType === 'province' ? '省份数据' : '城市数据')
        )
      } else {
        this.settingDialogVisible = false
        this.Xcolumn = settings.lonColumn
        this.Ycolumn = settings.latColumn
        this.handleFilter(filterType, settings)
      }
      this.fullscreenLoading = false
    },
    handleFilter(filterType, settings) {
      let areaData =
        settings[
          filterType === 'province'
            ? 'provinces'
            : filterType === 'city'
              ? 'cities'
              : 'customAreas'
        ]
      let selectAreaData
      if (filterType === 'customize') {
        selectAreaData = areaData
      } else {
        let selectedData = settings.selectedData
        selectAreaData = areaData.filter(area => {
          return selectedData.indexOf(area.value) > -1
        })
      }
      let geometies = []
      selectAreaData.forEach(area => {
        let featureData = area.feature
        let feature = new GeoJSON().readFeature(featureData)
        geometies.push(feature.getGeometry())
      })
      let filteredTableData = this.tableData.filter(row => {
        let lon = row[settings.lonColumn]
        let lat = row[settings.latColumn]
        let isInclude = false,
          isExclude = true
        geometies.forEach(geom => {
          var isContain = geom.contianXY
            ? geom.contianXY(lon, lat)
            : geom.containsXY(lon, lat)
          isInclude = isInclude || isContain
          isExclude = isExclude && !isContain
        })
        if (settings.filterMethod === 'include') {
          return isInclude
        } else {
          return isExclude
        }
      })
      this.tableData = filteredTableData
      this.loadMapCount++
    },
    handleSelectLonLatBtnClick() {
      this.Xcolumn = this.$refs.lonLatForm.selectedLon
      this.Ycolumn = this.$refs.lonLatForm.selectedLat
      this.labelColumn = this.$refs.lonLatForm.selectedLabel
      if (!this.Xcolumn || !this.Ycolumn || !this.labelColumn) {
        this.$message({
          message: '还没选择完字段，不能继续',
          type: 'warning'
        })
        return
      }
      this.loadMapCount++
      this.lonlatDialogVisible = false
      this.mapDialogVisible = true
    },
    handleMapBtnClick() {
      if (!this.Xcolumn || !this.Ycolumn || !this.labelColumn) {
        this.lonlatDialogVisible = true
      } else {
        this.mapDialogVisible = true
      }
    },
    handleOriginBtnClick() {
      if (this.tableData === this.originTableData) {
        return
      }
      this.tableData = this.originTableData
      this.loadMapCount++
    },
    handleClearBtnClick() {
      this.$confirm('确认清空数据？')
        .then(() => {
          this.Xcolumn = null
          this.Ycolumn = null
          this.tableData = null
          this.labelColumn = null
        })
        .catch(() => {})
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
.v-tool-btn-container {
  text-align: right;
}
.v-tool-btn-container .v-btn {
  position: relative;
  top: -16px;
}
.v-filter-btn-circle {
  position: absolute;
  top: 87px;
  right: 123px;
  z-index: 99;
}
.v-file-encode-select {
  width: 84px;
  top: -16px;
  margin-left: 12px;
}
.v-label-select {
  position: absolute !important;
  top: 15px;
  right: 110px;
  width: 120px;
}
</style>