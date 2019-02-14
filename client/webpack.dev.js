const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { resolve } = require('path');

const PORT = 3001;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: PORT,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
