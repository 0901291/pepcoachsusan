const path                  = require('path');
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const autoprefixer          = require('autoprefixer');
const precss                = require('precss');
const failPlugin = require('webpack-fail-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

const serverConfig = {
    outputName: "index",
    srcPath: path.resolve(__dirname, "../src/"),
    publicPath: path.resolve(__dirname, "../dist")
};

const config = {
    entry: {
        index: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, serverConfig.srcPath + "/js/index.js")]
    },
    output: {
        path: path.resolve(__dirname, serverConfig.publicPath),
        filename: `${serverConfig.outputName}.js`
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['file?hash=sha512&digest=hex&name=[path][name].[ext]&context=' + serverConfig.srcPath, 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]',
                    prefixize: true
                })
            },
            {
                test: [/\.css$/, /\.scss$/],
                loader: ExtractTextPlugin.extract('style-loader',
                  'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?\S*)?$/,
                loader: 'file-loader',
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new WebpackNotifierPlugin({
            contentImage: path.join(__dirname, './assets/logo-def-pepcoach.png')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, serverConfig.srcPath + "/static"),
                to: path.resolve(__dirname, serverConfig.publicPath)
            },
            {
                from: path.resolve(__dirname, serverConfig.srcPath + "/img"),
                to: path.resolve(__dirname, `${serverConfig.publicPath}/img`)
            },
            {
                from: path.resolve(__dirname, serverConfig.srcPath + "/js/vendor"),
                to: path.resolve(__dirname, `${serverConfig.publicPath}/vendor`)
            }
        ]),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin("[name].css"),
        failPlugin
    ]
};

if (IS_DEV) {
} else {
    config.plugins.push(
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
    );
}

module.exports = config;