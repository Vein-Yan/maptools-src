const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件,
    new VueLoaderPlugin()
  ],
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: './build',
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@component': path.resolve(__dirname, 'src/js/components'),
      '@theme': path.resolve(__dirname, 'theme'),
      '@data': path.resolve(__dirname, 'data')
    }
  }
}
