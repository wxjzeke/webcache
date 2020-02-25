const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

const BANNER = `
********************************************************************
@name v@version
@homepage
Copyright (c) 2020 @author
This source code is licensed under the @license license found in the
LICENSE file in the root directory of this source tree.
********************************************************************`

module.exports = {
  mode: 'none',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'WebCache',
    libraryExport: 'default'
  },
  plugins: [
    new webpack.BannerPlugin(
      ['name', 'version', 'homepage', 'author', 'license'].reduce(
        (pre, next) => pre.replace(`@${next}`, pkg[next]),
        BANNER
      )
    )
  ]
}
