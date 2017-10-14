const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

const extractVendorStyle = new ExtractTextPlugin({
    filename: "vendor.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const extractAppStyle = new ExtractTextPlugin({
    filename: "app.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});



module.exports = {
    entry: {
        'app': './src/main.ts',
        'vendor': ['jquery', "bootstrap"]
    },
    output: {
        filename: 'bundle.[name].[hash].js',
        path: helpers.root('', 'dist')
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
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets/fonts/', // where the fonts will go
                        publicPath: '../' // override the default path
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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/pages/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'no-content.html',
            template: './src/template/pages/no-content.pug'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        extractVendorStyle,
        extractAppStyle
    ]
};