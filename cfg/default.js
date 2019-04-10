/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, './../src');
const dfltPort = 8080;
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules(devMode) {
  return {
    rules: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.sass/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?outputStyle=expanded&indentedSyntax']
      },
      {
        test: /\.scss/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?outputStyle=expanded']
      },
      {
        test: /\.less/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.styl/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: ['url-loader?limit=8192']
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};