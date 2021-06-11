const path = require('path')
const webpack = require('webpack')
const {
    spawn
} = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
        new CopyPlugin({
            patterns: [{
                from: "**/*",
                to: "[path][name].[ext]",
                context: "public/"
            }]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
            chunks: false,
            children: false,
        },
        before() {
            spawn('electron', ['.'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit',
                })
                .on('close', (code) => process.exit(0))
                .on('error', (spawnError) => console.error(spawnError))
        },
    },
}