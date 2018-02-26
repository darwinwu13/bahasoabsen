const path = require('path')
const webpack = require('webpack')
const html = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'env', 'stage-1'],
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractText.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractText('style.css'),
        new html({
            template: './src/index.html',
            favicon: 'src/Images/logo.png'
        })
    ],
    externals: {
        TweenLite: 'TweenLite'
    },
    devServer: {
        historyApiFallback: true
    }
}
