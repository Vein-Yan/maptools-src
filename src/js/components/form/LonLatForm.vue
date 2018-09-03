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
import Util from '@/js/util.js'
export default {
  props: ['tableColumns'],
  data() {
    return {
      selectedLon: null,
      selectedLat: null
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
        if (Util.isLongitude(val)) {
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
        if (Util.isLatitude(val)) {
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


