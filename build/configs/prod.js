const webpack = require('webpack');
const _ = require('lodash');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const failPlugin = require('webpack-fail-plugin');

const baseConfig = require('./base.js');
const config = _.merge(baseConfig, {
    cache: true,
    devtool: 'source-map'
});

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    mangle: false
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin({
    compress: {
      warnings: false
    }
  }),
  new ExtractTextPlugin("[name].css"),
  failPlugin
);

// Add needed loaders
config.module.loaders.push(
  {
    test: [/\.scss$/, /\.sass$/],
    loader: ExtractTextPlugin.extract('style-loader',
    'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
  }
);

module.exports = config;
