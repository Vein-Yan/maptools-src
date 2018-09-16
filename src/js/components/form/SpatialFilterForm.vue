<template>
  <el-form>
    <el-form-item label="选择经度字段" label-width='120px'>
      <el-select v-model="selectedLontitude" filterable placeholder="请选择">
        <el-option v-for="item in lonColumns" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择纬度字段" label-width='120px'>
      <el-select v-model="selectedLattitude" filterable placeholder="请选择">
        <el-option v-for="item in latColumns" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="dataLabel" label-width='120px' v-if="!!allData">
      <el-select v-model="selectedAreaData" filterable multiple placeholder="请选择" @change=onSelectAreaDataChange>
        <el-option v-for="item in allData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="过滤方式" label-width='120px'>
      <el-radio-group v-model="filterMethod">
        <el-radio label="include">保留{{type}}内的数据</el-radio>
        <el-radio label="exclude">剔除{{type}}内的数据</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: [
    'lonColumns',
    'selectedLon',
    'latColumns',
    'selectedLat',
    'allData',
    'type'
  ],
  data() {
    return {
      selectedAreaData: [],
      selectedLontitude: null,
      selectedLattitude: null,
      filterMethod: 'include'
    }
  },
  computed: {
    dataLabel() {
      return '选择' + this.type
    }
  },
  watch: {
    selectedLontitude() {
      this.updateSettings()
    },
    selectedLattitude() {
      this.updateSettings()
    },
    filterMethod() {
      this.updateSettings()
    },
    selectedLon(val){
      this.selectedLontitude = val
    },
    selectedLat(val){
      this.selectedLattitude = val
    }
  },
  created(){
    this.selectedLontitude = this.selectedLon
    this.selectedLattitude = this.selectedLat
  },
  methods: {
    updateSettings() {
      let settings = {
        selectedData: this.selectedAreaData,
        lonColumn: this.selectedLontitude,
        latColumn: this.selectedLattitude,
        filterMethod: this.filterMethod
      }
      this.$emit('onSettingChange', settings)
    },
    onSelectAreaDataChange() {
      this.updateSettings()
    }
  }
}
</script>

<style>
.el-form-item {
  width: 480px;
}
</style>


