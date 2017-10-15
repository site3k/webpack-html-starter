const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var configs = require('./configs');
var _ = require('lodash');


const extractVendorStyle = new ExtractTextPlugin({
    filename: "vendor.css"
});

const extractAppStyle = new ExtractTextPlugin({
    filename: "app.css"
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
        filename: 'bundle.[name].[hash].js',
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
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractAppStyle.extract({
                    fallback: 'style-loader',
                    use: ["css-loader", 'sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
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