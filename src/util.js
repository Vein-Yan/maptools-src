import Papa from 'papaparse'
import Promise from 'promise-polyfill'

function readCSV(rawFile, fileEncode) {
  let promise = new Promise((resolve, reject) => {
    Papa.parse(rawFile, {
      encoding: fileEncode,
      complete: result => {
        let data = result.data
        let tableData = []
        let tableColumns = data[0]
        data.forEach((element, i) => {
          if (i === 0) {
            return
          }
          let rowData = data[i],
            row = {}
          tableColumns.forEach((ele, idx) => {
            row[ele] = rowData[idx]
          })
          tableData.push(row)
        })
        resolve({
          tableColumns,
          tableData
        })
      },
      error() {
        reject()
      }
    })
  })
  return promise
}

function outputCSV(tableColumns, tableData, fileName) {
  let outputData = []
  tableData.forEach(row => {
    let newRow = []
    tableColumns.forEach((column, idx) => {
      newRow[idx] = row[column]
    })
    outputData.push(newRow)
  })
  let outPutJson = {
    fields: tableColumns,
    data: outputData
  }
  let output = Papa.unparse(outPutJson)
  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + output
  const link = document.createElement('a')
  link.href = encodeURI(csvContent)
  link.download = href
  document.body.appendChild(link) // Required for FF
  link.click()
  document.body.removeChild(link) // Required for FF
}

function isLongitude(val) {
  val = val || ''
  var upperVal = val.toUpperCase()
  if (
    upperVal === 'X' ||
    upperVal === 'COORX' ||
    upperVal === 'LON' ||
    upperVal === 'LNG' ||
    upperVal === 'LONGITUDE' ||
    upperVal === '经度'
  ) {
    return true
  }
  return false
}

function isLatitude(val) {
  val = val || ''
  var upperVal = val.toUpperCase()
  if (
    upperVal === 'Y' ||
    upperVal === 'COORY' ||
    upperVal === 'LAT' ||
    upperVal === 'LATITUDE' ||
    upperVal === '纬度'
  ) {
    return true
  }
  return false
}

export default {
  readCSV,
  outputCSV,
  isLongitude,
  isLatitude
}
