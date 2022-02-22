const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:'./scr/cliente/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rule: [
            {
                test: /\.css$/,
                use: ['style-loader' ,'css-loader']

            }
        ]
        
    }
    ,plugins: [
        new htmlWebpackPlugin({
            template:'./src/cliente/index.html'
        }
        )
    ]
}