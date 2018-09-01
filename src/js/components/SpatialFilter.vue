<template>
  <div class="v-spatial-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>空间过滤</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="tableDataNotNull" class="v-table">
      <div class="v-tool-btn-container" v-if="hasData">
        <el-button class="v-btn v-filter-btn" type="primary" icon="fa fa-filter" round @click="handleFilterBtnClick">空间过滤</el-button>
        <el-tooltip v-if="scrollTop > 80" class="v-filter-btn-circle" content="空间过滤" placement="right">
          <el-button type="primary" icon="fa fa-filter" circle @click="handleFilterBtnClick"></el-button>
        </el-tooltip>
        <el-button class="v-btn v-output-btn" type="primary" icon="fa fa-map" :disabled="tableData.length > 50000" round @click="hanldeMapBtnClick">地图显示</el-button>
        <el-button class="v-btn v-output-btn" type="primary" icon="fa fa-download" :disabled="tableData.length > 50000" round @click="hanldeOutputBtnClick">导出CSV</el-button>
        <el-button class="v-btn v-clear-btn" type="primary" icon="fa fa-trash" round @click="handleClearBtnClick">清空</el-button>
      </div>
      <el-table :data="currentPageData" stripe border style="width: 100%">
        <div v-for="(column,idx) in tableColumns" :key="idx">
          <el-table-column :prop="column" :label="column" align="left"></el-table-column>
        </div>
      </el-table>
      <div class="v-block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <div v-if="!tableDataNotNull" class="v-upload">
      <el-upload class="upload-demo" :auto-upload="false" drag :multiple="false" accept="text/csv" action="https://jsonplaceholder.typicode.com/posts/" :on-change=onFileChange>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">打开需要做空间过滤的文件，只支持csv文件</div>
      </el-upload>
    </div>
    <el-dialog title="空间过滤属性设置" :visible.sync="settingDialogVisible" width="50%" :before-close="handleSettingDialogClose">
      <spatial-filter-settings ref='spatialfilterSettings' :tableColumns="tableColumns"></spatial-filter-settings>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="handleBeginFilterBtnClick">开始过滤</el-button>
      </span>
    </el-dialog>
    <el-dialog title="空间字段选择" :visible.sync="lonlatDialogVisible" width="40%">
      <lon-lat-form ref="lonLatForm" :tableColumns="tableColumns"></lon-lat-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lonlatDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="handleSelectLonLatBtnClick">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="地图显示" :visible.sync="mapDialogVisible" width="90%">
      <table-map ref="tableMap" mapId="tableMap" :tableData="tableData" :Xcolumn="Xcolumn" :Ycolumn="Ycolumn" :loadCount="loadMapCount"></table-map>
    </el-dialog>
  </div>
</template>

<script>
import GeoJSON from 'ol/format/geojson'
import Papa from 'papaparse'
import SpatialFilterSettings from './spatialFilter/SpatialFilterSettings.vue'
import LonLatForm from './form/LonLatForm.vue'
import TableMap from './map/TableMap.vue'
export default {
  props: ['mainScrollTop'],
  components: { SpatialFilterSettings, LonLatForm, TableMap },
  data() {
    return {
      lonlatDialogVisible: false,
      settingDialogVisible: false,
      mapDialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      tableColumns: null,
      tableData: null,
      fileName: null,
      fullscreenLoading: false,
      Xcolumn: null,
      Ycolumn: null,
      loadMapCount: 0
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
    },
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
      Papa.parse(file.raw, {
        encoding: 'GBK',
        complete: result => {
          let data = result.data
          this.tableData = []
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
    hanldeOutputBtnClick() {
      let tableData = []
      this.tableData.forEach(row => {
        let newRow = []
        this.tableColumns.forEach((column, idx) => {
          newRow[idx] = row[column]
        })
        tableData.push(newRow)
      })
      let outPutJson = {
        fields: this.tableColumns,
        data: tableData
      }
      let output = Papa.unparse(outPutJson)
      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + output
      const link = document.createElement('a')
      link.href = encodeURI(csvContent)
      let fileName = this.fileName.replace(/\.csv$/, '')
      link.download = `${fileName + '_filter_' + new Date().getTime()}.csv`
      document.body.appendChild(link) // Required for FF
      link.click()
      document.body.removeChild(link) // Required for FF
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
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
    handleSettingDialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
            : filterType === 'city' ? 'cities' : 'customAreas'
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
    },
    handleSelectLonLatBtnClick() {
      this.Xcolumn = this.$refs.lonLatForm.selectedLon
      this.Ycolumn = this.$refs.lonLatForm.selectedLat
      this.loadMapCount++
      this.lonlatDialogVisible = false
      this.mapDialogVisible = true
    },
    hanldeMapBtnClick() {
      if (!this.Xcolumn || !this.Ycolumn) {
        this.lonlatDialogVisible = true
      } else {
        this.mapDialogVisible = true
      }
    },
    handleClearBtnClick() {
      this.Xcolumn = null
      this.Ycolumn = null
      this.tableData = null
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
.v-btn .fa {
  margin-right: 3px;
}
.v-filter-btn-circle {
  position: absolute;
  top: 87px;
  right: 123px;
  z-index: 99;
}
</style>

