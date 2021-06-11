const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }],
        }, {
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                query: {
                    compact: false
                }
            }],
        }, {
            test: /\.(jpe?g|png|gif)$/,
            use: [{
                // the example code adds 5 characters of the hash wanted, unsure why?
                //loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]'
                loader: 'file-loader?name=img/[name].[ext]'
            }],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                //loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]'
                loader: 'file-loader?name=font/[name].[ext]'
            }, ],
        }, ],
    },
    target: 'electron-renderer',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: "**/*",
                to: "[path]/[name].[ext]",
                context: "public/"
            }]
        }),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
}