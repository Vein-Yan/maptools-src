import 'babel-polyfill';
import map from './map.js'
 
let app = document.getElementById('app');
let mapContainer = document.createElement('DIV');
app.append(mapContainer);
let width = window.innerWidth, height = window.innerHeight;
app.style.height = window.height + 'px';
map.setSize([width,height]);

document.body.onresize = function(){
    let width = window.innerWidth, height = window.innerHeight;
    app.style.height = height + 'px';
    map.setSize([width,height]);
}

window.map = map;