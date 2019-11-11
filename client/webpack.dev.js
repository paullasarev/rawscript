const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const PORT = 3001;
const API_URL = 'http://localhost:3000';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: PORT,
    publicPath: '/',
    proxy: {
      '/api': {
        target: API_URL,
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
