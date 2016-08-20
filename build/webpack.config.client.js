const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const clientConfig = {
  entry: {
    index: ['babel-polyfill', `${__dirname}/src/scripts/app.js`]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  devtool: 'source-maps',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('index.css'),
    new CopyWebpackPlugin([{
        from: './src/static',
        to: './'
      }, {
        from: './src/img',
        to: './img'
      },
      {
        from: './src/scripts/vendor',
        to: './vendor'
      }]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      },
      {
        test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test:   /\.css/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};

module.exports = clientConfig;
