<template>
  <div>
    <el-row :gutter="12" v-for="(toolGroup, idx) in spatialTools" :key="idx">
      <el-col :span="8" v-for="(tool, index) in toolGroup" :key="index">
        <tool-link :link="tool.link" :label="tool.label" :className="tool.className"></tool-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ToolLink from '@/components/spatialToolLink/SpatialToolLink.vue'
export default {
  components: { ToolLink },
  data() {
    return {
      spatialTools: [
        [
          {
            link: '/spatialFilter',
            label: '空间过滤',
            className: 'fa fa-filter'
          },
          {
            link: '/transform',
            label: '坐标转换',
            className: 'fa fa-exchange'
          },
          {
            link: '/buffer',
            label: '缓冲范围',
            className: 'fa fa-dot-circle-o'
          }
        ],
        [
          {
            link: '/elevation',
            label: '高程数据获取',
            className: 'fa fa-sort-numeric-desc'
          },
          {
            link: '/dataVisualization',
            label: '空间数据可视化',
            className: 'fa fa-map-o'
          },
          {
            link: '/draw',
            label: '绘制图形',
            className: 'fa fa-paint-brush'
          }
        ]
      ]
    }
  }
}
</script>

