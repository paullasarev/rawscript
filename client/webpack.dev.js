const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const PORT = 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: './dist',
    port: PORT,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
