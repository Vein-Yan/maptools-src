<template>
  <div>
    <el-row :gutter="12" v-for="(toolGroup, idx) in spatialTools" :key="idx">
      <el-col :span="8" v-for="(tool, index) in toolGroup" :key="index">
        <tool-link :link="tool.link" :label="tool.label"></tool-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ToolLink from '@component/spatialToolLink/SpatialToolLink.vue'
export default {
  components: { ToolLink },
  data() {
    return {
      spatialTools: [
        [
          {
            link: '/spatialFilter',
            label: '空间过滤'
          },
          {
            link: '/transform',
            label: '坐标转换'
          },
          {
            link: '/buffer',
            label: '缓冲范围'
          }
        ],
        [
          {
            link: '/elevation',
            label: '高程数据获取'
          },
          {
            link: '/dataVisualization',
            label: '空间数据可视化'
          },
          {
            link: '/draw',
            label: '绘制图形'
          }
        ]
      ]
    }
  }
}
</script>

