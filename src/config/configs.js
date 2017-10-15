var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    pages: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/pages/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'no-content.html',
            template: './src/template/pages/no-content.pug'
        }),
    ]
};