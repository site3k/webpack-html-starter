var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const extractVendorStyle = new ExtractTextPlugin({
    filename: "vendor.[name].css",
    disable: process.env.NODE_ENV === "development"
});

const extractAppStyle = new ExtractTextPlugin({
    filename: "app.[name].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
    },

    plugins: [
        extractVendorStyle,
        extractAppStyle
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});