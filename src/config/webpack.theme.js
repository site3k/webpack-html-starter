const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var _ = require('lodash');

var configs = require('./configs');


const extractVendorStyle = new ExtractTextPlugin({
    filename: "assets/css/vendor.css"
});

const extractAppStyle = new ExtractTextPlugin({
    filename: "assets/css/app.css"
});



var plugins = _.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor']
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
    extractVendorStyle,
    extractAppStyle
], configs.pages);


module.exports = {
    entry: {
        'app': './src/main.ts',
        'vendor': ['jquery', "bootstrap"]
    },
    output: {
        filename: 'assets/js/bundle.[name].js',
        path: helpers.root('dist')
    },
    resolve: {
        extensions: ['.ts', '.js', ".scss", '.pug']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('', 'tsconfig.json') }
                }]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: extractVendorStyle.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            minimize: true
                        }
                    }
                })
            },
            {
                test: /\.scss$/,
                use: extractAppStyle.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            minimize: true
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/',
                        publicPath: '../../'
                    }
                }]
            },
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            exports: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
};