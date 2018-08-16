const path = require('path');

 module.exports = {
   entry: {
     index: "./src/js/index.js",
   },
   output: {
    filename: '[name].bundle.js',
    publicPath: "/assets/",
    path: path.resolve(__dirname, 'build')
  },
   devtool:"source-map",
   module: {
     rules: [
       {
         test:/\.js$/,
         exclude: /node_modules/,
         use: ['babel-loader']
       },
       {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       },{
         test: /\.(png|jpg|gif)$/,
         use: ['file-loader']
       }]
     }
 };
