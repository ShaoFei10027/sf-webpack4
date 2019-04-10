const webpack = require('webpack')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    page: ['@babel/polyfill', './src/index.js']
  },
  output: {
    publicPath: "./",
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: "8080",
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'image/[name].[ext]'
          }
        }, 'file-loader']
      }
    ]
  },
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        delete: ['./zip'],
        mkdir: ['./zip'],
        archive: [{
          source: './dist',
          destination: './zip/dist.zip'
        }, ]
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
  //devServer: {},
  mode: 'development'
}