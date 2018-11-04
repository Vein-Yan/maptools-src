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
import WKT from 'ol/format/WKT.js'

import 'ol/ol.css'

const formatter = new WKT()
export default {
  props: ['mapId', 'tableData', 'spatialColumn', 'labelColumn', 'loadCount'],
  data() {
    return {
      vectorSource: null,
      textSource: null,
      map: null,
      view: null
    }
  },
  computed:{
    upperColumn(){
      return this.spatialColumn.toUpperCase()
    },
    lowerColumn(){
      return this.spatialColumn.toLowerCase()
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
      this.vectorSource = new VectorSource()
      let vectorLayer = new VectorLayer({
        source: this.vectorSource
      })

      this.textSource = new VectorSource()
      let textLayer = new VectorLayer({
        declutter: true,
        source: this.vectorSource
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
      if (!this.tableData || !this.spatialColumn) {
        return
      }
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        let row = this.tableData[i]
        let wkt = row[this.spatialColumn] || row[this.upperColumn] || row[this.lowerColumn]
       if (!wkt) {
          continue
        }
        let feature = formatter.readFeature(wkt, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
        feature.setProperties(row)
        this.vectorSource.addFeature(feature)
        // this.textSource.addFeature(feature)
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
  height: calc(100vh - 112px);
}
</style>