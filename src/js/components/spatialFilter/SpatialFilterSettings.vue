<template>
  <div>
    <el-radio-group v-model="filterType">
      <el-radio label="province">按省份</el-radio>
      <el-radio label="city">按城市</el-radio>
      <el-radio label="customize">自定义</el-radio>
    </el-radio-group>
    <section class="v-settings" :class="{hide: filterType !== 'province'}">
      <spatial-filter-form :lonColumns="lonColumns" :selectedLon="selectedLontitude" :latColumns="latColumns" :selectedLat="selectedLattitude" :allData="allProvinces" type="省份" @onSettingChange=handleProvinceSettingChange></spatial-filter-form>
    </section>
    <section class="v-settings" :class="{hide: filterType !== 'city'}">
      <spatial-filter-form :lonColumns="lonColumns" :selectedLon="selectedLontitude" :latColumns="latColumns" :selectedLat="selectedLattitude" :allData="allCities" type="城市" @onSettingChange=handleCitySettingChange></spatial-filter-form>
    </section>
    <section class="v-settings" :class="{hide: filterType !== 'customize'}">
      <spatial-filter-form v-if='hasFeature' :lonColumns="lonColumns" :selectedLon="selectedLontitude" :latColumns="latColumns" :selectedLat="selectedLattitude" type="区域" @onSettingChange=handleCustomSettingChange></spatial-filter-form>
      <el-upload v-else class="upload-demo" :auto-upload="false" drag :multiple="false" accept="application/json" action="https://jsonplaceholder.typicode.com/posts/" :on-change=onFileChange>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传自定义的区域数据geojson文件，可在绘制图形模块绘制并导出</div>
      </el-upload>
    </section>
  </div>
</template>

<script>
import SpatialFilterForm from '../form/SpatialFilterForm.vue'
import Provinces from '@data/geojson/china.json'
import Cities from '@data/geojson/capitals.json'
const FILTER_TYPE = {
  PROVINCE: 'province',
  CITY: 'city',
  CUSTOMIZE: 'customize'
}
export default {
  props: ['tableColumns'],
  components: { SpatialFilterForm },
  data() {
    return {
      filterType: FILTER_TYPE.PROVINCE,
      allProvinces: [
        { label: '广西', value: 'guangxi' },
        { label: '广东', value: 'guangdong' },
        { label: '四川', value: 'sichuan' },
        { label: '湖南', value: 'hunan' }
      ],
      selectedProvinces: [],
      allCities: [
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
        { label: '南宁', value: 'nanning' },
        { label: '成都', value: 'chengdu' }
      ],
      selectedCities: [],
      selectedLontitude: null,
      selectedLattitude: null,
      filterMethod: 'include',
      settings: {
        province: null,
        city: null,
        customize: null
      },
      customizeFeatures: []
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
          this.selectedLontitude = val
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
          this.selectedLattitude = val
        }
        columns.push(column)
      })
      return columns
    },
    hasFeature(){
      return this.customizeFeatures.length > 0
    }
  },
  created() {
    this.allProvinces.length = 0
    Provinces.features.forEach(feature => {
      var properties = feature.properties
      var province = {
        label: properties.name,
        value: +properties.id,
        feature: feature
      }
      this.allProvinces.push(province)
    })
    this.allProvinces.sort((province0, province1) => {
      return province0.value - province1.value
    })
    this.allCities.length = 0
    Cities.features.forEach(feature => {
      var properties = feature.properties
      var city = {
        label: properties.name,
        value: +properties.id,
        feature: feature
      }
      this.allCities.push(city)
    })
    this.allCities.sort((city0, city1) => {
      return city0.value - city1.value
    })
  },
  methods: {
    onFileChange(file) {
      this.customizeFeatures.length = 0
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(file.raw)
      fileReader.onload = evt => {
        let data = evt.target.result
        try {
          data = JSON.parse(data)
        } catch (e) {
          this.$message.error('请上传正确的geojson文件')
          return
        }
        if (!(data.type && data.features)) {
          this.$message.error('请上传正确的geojson文件')
          return
        }
        data.features.forEach(feature => {
          var fea = {
            feature: feature
          }
          this.customizeFeatures.push(fea)
        })
      }
    },
    handleProvinceSettingChange(settings) {
      settings.provinces = this.allProvinces
      this.settings[FILTER_TYPE.PROVINCE] = settings
    },
    handleCitySettingChange(settings) {
      settings.cities = this.allCities
      this.settings[FILTER_TYPE.CITY] = settings
    },
    handleCustomSettingChange(settings){
      settings.customAreas = this.customizeFeatures
      this.settings[FILTER_TYPE.CUSTOMIZE] = settings
    }
  }
}
</script>

<style>
.v-settings {
  margin: 32px 32px 0 32px;
  text-align: center;
}
.v-settings.hide {
  display: none;
}
</style>

