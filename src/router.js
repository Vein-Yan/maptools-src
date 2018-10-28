import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SpatialFilter from './views/SpatialFilter.vue'
import Buffer from './views/Buffer.vue'
import Transform from './views/Transform.vue'
import Elevation from './views/Elevation.vue'
import DrawGraphics from './views/DrawGraphics.vue'
import DataVisualization from './views/DataVisualization.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/spatialFilter',
      name: 'spatialFilter',
      component: SpatialFilter
    },
    {
      path: '/transform',
      name: 'transform',
      component: Transform
    },
    {
      path: '/buffer',
      name: 'buffer',
      component: Buffer
    },
    {
      path: '/elevation',
      name: 'elevation',
      component: Elevation
    },
    {
      path: '/draw',
      name: 'draw',
      component: DrawGraphics
    },
    {
      path: '/dataVisualization',
      name: 'dataVisualization',
      component: DataVisualization
    }

  ]
})