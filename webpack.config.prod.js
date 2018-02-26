const path = require('path')
const webpack = require('webpack')
const html = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        bundle: './src/index',
        vendor: ['react', 'react-dom', 'firebase', 'gsap']
    },
    output: {
        filename: '[chunkhash:10].js',
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
                            localIdentName: '[hash:base64:10]'
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
                            name: '[hash:base64:10].[ext]',
                            outputPath: 'images',
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    externals: {
        TweenLite: 'TweenLite'
    },
    plugins: [
        new ExtractText('[contenthash:10].css'),
        new html({
            template: 'src/index.html',
            favicon: 'src/Images/logo.png'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}
