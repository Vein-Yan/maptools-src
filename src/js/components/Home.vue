<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/spatialFilter">空间过滤</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/transform">坐标转换</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/buffer">缓冲范围</router-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/elevation">高程数据获取</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/dataVisualization">空间数据可视化</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <router-link to="/draw">绘制图形</router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
