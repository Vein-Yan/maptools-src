import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Home from './components/Home.vue';
import SpatialFilter from './components/SpatialFilter.vue';
import Buffer from './components/Buffer.vue';
import DataVisualization from './components/DataVisualization.vue';

Vue.use(VueRouter)
Vue.use(ElementUI);

const routes = [
  { path: '/', component: Home },
  { path: '/spatialFilter', component: SpatialFilter },
  { path: '/buffer', component: Buffer },
  { path: '/dataVisualization', component: DataVisualization }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});