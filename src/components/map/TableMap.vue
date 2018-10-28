<template>
  <div class="mapContainer"
    :id="mapId"></div>
</template>

<script>
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ.js'
import VectorLayer from 'ol/layer/Vector.js'
import VectorSource from 'ol/source/Vector.js'
import Point from 'ol/geom/Point.js'
import Feature from 'ol/Feature.js'
import Style from 'ol/style/Style.js'
import Circle from 'ol/style/Circle.js'
import Fill from 'ol/style/Fill.js'
import Stroke from 'ol/style/Stroke.js'
import Text from 'ol/style/Text.js'
import { fromLonLat } from 'ol/proj.js'

import 'ol/ol.css'
export default {
  props: [
    'mapId',
    'tableData',
    'Xcolumn',
    'Ycolumn',
    'labelColumn',
    'loadCount'
  ],
  data() {
    return {
      vectorSource: null,
      textSource: null,
      map: null,
      view: null
    }
  },
  watch: {
    labelColumn() {
      this.$nextTick(() => {
        this.map && this.map.renderSync()
      })
    },
    loadCount() {
      this.loadDataToMap()
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
          radius: 8,
          snapToPixel: false,
          fill: new Fill({
            color: '#DE8100'
          }),
          stroke: new Stroke({
            color: '#333300',
            width: 2
          })
        })
      })
      let textStyle = new Style({
        text: new Text({
          font: '19px "Microsoft YaHei",arial,sans-serif',
          placement: 'point',
          offsetY: -17,
          fill: new Fill({
            color: '#333300'
          }),
          stroke: new Stroke({
            color: '#DDDDDD',
            width: 1
          })
        })
      })
      this.vectorSource = new VectorSource()
      let vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: circleStyle
      })

      this.textSource = new VectorSource()
      let textLayer = new VectorLayer({
        declutter: true,
        source: this.vectorSource,
        style: feature => {
          let props = feature.getProperties()
          textStyle.getText().setText(props[this.labelColumn])
          return textStyle
        }
      })

      this.view = new View({
        center: [0, 0],
        zoom: 3,
        minZoom: 3,
        maxZoom: 20
      })

      this.map = new Map({
        target: this.mapId,
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
            })
          }),
          vectorLayer,
          textLayer
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
          let coor = fromLonLat(coordinates)
          coordinates[0] = coor[0]
          coordinates[1] = coor[1]
          return coor
        })
        let feature = new Feature({
          geometry: geometry
        })
        feature.setProperties(row)
        this.vectorSource.addFeature(feature)
        this.textSource.addFeature(feature)
      }
      let extent = this.vectorSource.getExtent()
      //console.log(extent)
      this.view.fit(extent)
    }
  }
}
</script>

<style>
.mapContainer {
  height: calc(100vh - 290px);
}
</style>


