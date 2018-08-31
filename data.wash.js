import fs from 'fs'
import provinces_capitals from './data/capital.json'
import chinaJson from './data/geojson/china.json'

let capitals = []
provinces_capitals.forEach((province_capital)=>{
  capitals.push(province_capital[1])
});
console.log(capitals)

let cities = []
let features = chinaJson.features;
features.forEach((feature)=>{
  let properties = feature.properties
  if(inCapitalsList(properties.name)){
    console.log(feature)
    cities.push(feature)
    console.log('现在加载的城市是+++++++++++++++0：'+ properties.name)
  }else{
    let id = properties.id
    let provinceGeojsonStr = fs.readFileSync('./data/geojson/geometryProvince/'+id+'.json', 'utf8')
    let provinceGeojson = JSON.parse(provinceGeojsonStr)
    let provinceFeatures = provinceGeojson.features
    provinceFeatures.forEach((provinceFeature)=>{
      let props = provinceFeature.properties
      if(inCapitalsList(props.name)){
        console.log(provinceFeature)
        props.id = id
        cities.push(provinceFeature)
        console.log('现在加载的城市是++++++++++++1：'+ props.name)
      }
    })
  }
})

cities.sort((c0, c1)=>{
  let prop0 = c0.properties, prop1 = c1.properties
  let id0 = +prop0.id, id1 = +prop1.id
  return id0 - id1
})

console.log('排序后的城市：')
cities.forEach((city)=>{
  let prop = city.properties
  console.log('-------------------' + prop.name)
})

let outGeojson = {"type": "FeatureCollection",
"features": cities
}

fs.writeFile('./data/geojson/capitals.json', JSON.stringify(outGeojson), 'utf8', ()=>{
  console.log('所有省会和直辖市整理成功')
})

function inCapitalsList(name){
  for(let i = 0,len = capitals.length;i<len;i++){
    let capital = capitals[i]
    if(name === capital || name.indexOf(capital) > -1){
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!' + name + '!!!!!!!!!!!!!!!!!!')
      return true;
    }
  }
  return false;
}