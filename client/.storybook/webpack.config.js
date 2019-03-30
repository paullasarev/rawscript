const path = require('path');
const { pick } = require('lodash');
const merge = require('webpack-merge');

const custom = require('../webpack.dev.js');

module.exports = ({ config, mode }) => {
  // const newConfig = merge(config, pick(custom, ['context', 'resolve', 'module', 'plugins']));
  return merge(config, pick(custom, ['context', 'resolve', 'module']));
};

