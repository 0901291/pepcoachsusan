const path                  = require('path');
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const autoprefixer          = require('autoprefixer');
const precss                = require('precss');
const _                     = require('lodash');

const args = require('minimist')(process.argv.slice(2));

const env          = args.env || 'dev';
const serverConfig = require(path.resolve(__dirname, `../serverConfig.${env}.js`));

const outputName = getOutputName_();

function getOutputName_() {
    try {
        return serverConfig.outputName;
    } catch (e) {
        console.log('Cannot find serverConfig.js file. Using default app.js output file. \n');
    }
    return 'index';
}

const baseConfig = {
    entry: {
        index: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, serverConfig.srcPath + "/js/index.js")]
    },
    output: {
        path: path.resolve(__dirname, serverConfig.publicPath),
        filename: `${outputName}.js`
    },
    resolve: {
        root: [path.resolve(__dirname, serverConfig.srcPath + "/js"), path.resolve(__dirname, '../node_modules')],
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: [path.resolve(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['babel-preset-es2015', 'babel-preset-stage-0'].map(require.resolve)
                }
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
            }
            // {
            //     test: /vendor\/.+\.(jsx|js)$/,
            //     loader: 'imports?define=>false,jQuery=jquery,$=jquery,this=>window'
            // }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new WebpackNotifierPlugin({
            contentImage: path.join(__dirname, '../assets/logo-def-pepcoach.png')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, serverConfig.srcPath + "/static"),
                to: path.resolve(__dirname, serverConfig.publicPath)
            }, {
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
        })
    ]
};

var config = _.merge({
    entry: serverConfig.entry
}, baseConfig);

module.exports = config;