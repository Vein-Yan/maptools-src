<template>
  <div class="mapContainer" :id="mapId"></div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import XYZ from 'ol/source/xyz'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import Point from 'ol/geom/point'
import Feature from 'ol/feature'
import Style from 'ol/style/style'
import Circle from 'ol/style/circle'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import proj from 'ol/proj'

import 'ol/ol.css'
export default {
  props: ['mapId', 'tableData', 'Xcolumn', 'Ycolumn', 'loadCount'],
  data() {
    return {
      vectorSource: null,
      view: null
    }
  },
  mounted() {
    this.initMap()
    this.loadDataToMap()
  },
  methods: {
    initMap() {
      let circleStyle = new Style({
        image: new Circle({
          radius: 10,
          snapToPixel: false,
          fill: new Fill({
            color: '#333300'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 1
          })
        })
      })
      this.vectorSource = new VectorSource()
      let vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: circleStyle
      })

      this.view = new View({
        center: [0, 0],
        zoom: 3,
        minZoom: 3,
        maxZoom: 20
      })

      new Map({
        target: this.mapId,
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
            })
          }),
          vectorLayer
        ],
        view: this.view
      })
    },
    loadDataToMap() {
      this.vectorSource.clear()
      if (!this.tableData || !this.Xcolumn || !this.Ycolumn) {
        return
      }
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        let row = this.tableData[i]
        let x = +row[this.Xcolumn],
          y = +row[this.Ycolumn]
        if (!x || !y) {
          continue
        }
        let geometry = new Point([x, y])
        geometry.applyTransform(function(coordinates) {
          let coor = proj.fromLonLat(coordinates)
          coordinates[0] = coor[0]
          coordinates[1] = coor[1]
          return coor
        })
        let feature = new Feature({
          geometry: geometry
        })
        this.vectorSource.addFeature(feature)
      }
      let extent = this.vectorSource.getExtent()
      this.view.fit(extent)
    }
  },
  watch: {
    loadCount() {
      this.loadDataToMap()
    }
  }
}
</script>

<style>
.mapContainer {
  height: calc(100vh - 290px);
}
</style>


