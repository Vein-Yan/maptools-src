<template>
  <el-form>
    <el-form-item label="选择经度字段" label-width='120px'>
      <el-select v-model="selectedLon" filterable placeholder="请选择">
        <el-option v-for="item in lonColumns" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择纬度字段" label-width='120px'>
      <el-select v-model="selectedLat" filterable placeholder="请选择">
        <el-option v-for="item in latColumns" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: [
    'tableColumns'
  ],
  data() {
    return {
    'selectedLon': null,
    'selectedLat': null
    }
  },
  computed: {
    lonColumns() {
      let columns = []
      this.tableColumns.forEach(val => {
        let column = {
          label: val,
          value: val
        }
        var upperVal = val.toUpperCase()
        if (
          upperVal === 'X' ||
          upperVal === 'COORX' ||
          upperVal === 'LON' ||
          upperVal === 'LONTITUDE' ||
          upperVal === '经度'
        ) {
          this.selectedLon = val
        }
        columns.push(column)
      })
      return columns
    },
    latColumns() {
      let columns = []
      this.tableColumns.forEach(val => {
        let column = {
          label: val,
          value: val
        }
        var upperVal = val.toUpperCase()
        if (
          upperVal === 'Y' ||
          upperVal === 'COORY' ||
          upperVal === 'LAT' ||
          upperVal === 'LATTITUDE' ||
          upperVal === '纬度'
        ) {
          this.selectedLat = val
        }
        columns.push(column)
      })
      return columns
    }
  }
}
</script>

<style>
.el-form-item {
  width: 480px;
}
</style>


