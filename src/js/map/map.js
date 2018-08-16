import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Point from 'ol/geom/point';
import Feature from 'ol/feature';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Icon from 'ol/style/icon'
import proj from 'ol/proj';

import 'ol/ol.css';
import '../../css/map.css';

import icon from '../../img/icon_red.png';


let circleStyle = new Style({
    image: new Circle({
        radius: 10,
        snapToPixel: false,
        fill: new Fill({
            color: 'black'
        }),
        stroke: new Stroke({
            color: 'white',
            width: 2
        })
    })
});
let markerStyle = new Style({
    image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: icon
    })
})

let vectorSource = new VectorSource();
let vectorLayer = new VectorLayer({
    source: vectorSource,
});

let map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7'
            })
        }),
        vectorLayer
    ],
    view: new View({
        center:  [0,0],
        zoom: 3,
        minZoom: 3, 
        maxZoom: 20,
    })
});

let points = [
    [105, 34],
    [120, 23],
    [115, 23]
    //[10575351, 4028802]
    //[0, 0]
]
for (let i = 0, len = points.length; i < len; i++) {
    let point = points[i];
    let geometry = new Point(point);
    geometry.applyTransform(function(coordinates){
        let coor = proj.fromLonLat(coordinates);
        coordinates[0] = coor[0];
        coordinates[1] = coor[1];
        return coor;
    });
    let feature = new Feature({
        geometry: geometry
    });
    feature.setStyle(markerStyle);
    vectorSource.addFeature(feature);
}

export default map;