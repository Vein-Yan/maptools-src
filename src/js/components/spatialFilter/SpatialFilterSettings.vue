<template>
  <div>
    <el-radio-group v-model="filterType">
      <el-radio label="province">按省份</el-radio>
      <el-radio label="city">按城市</el-radio>
      <el-radio label="customize">自定义</el-radio>
    </el-radio-group>
    <section class="v-settings" v-if="filterType === 'province'">
      <el-form>
        <el-form-item label="选择省份" label-width='120px'>
          <el-select v-model="selectedProvinces" filterable multiple placeholder="请选择">
            <el-option v-for="item in allProvinces" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </section>
    <section class="v-settings" v-else-if="filterType === 'city'">
      <el-form>
        <el-form-item label="选择城市" label-width='120px'>
          <el-select v-model="selectedCities" filterable multiple placeholder="请选择">
            <el-option v-for="item in allCities" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </section>
    <section class="v-settings" v-else-if="filterType === 'customize'">
      <el-upload class="upload-demo" drag :multiple="false" accept="application/json" action="https://jsonplaceholder.typicode.com/posts/" :on-change=onChange>
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
const FILTER_TYPE = {
  PROVINCE: 'province',
  CITY: 'city',
  CUSTOMIZE: 'customize'
}
export default {
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
      selectedCities: []
    }
  },
  watch: {
    filterType() {
      console.log(this.filterType)
    }
  }
}
</script>

<style>
.v-settings {
  margin: 32px 32px 0 32px;
  text-align: center;
}
.el-form-item {
  width: 380px;
}
</style>

