const webpack             = require('webpack')
const path                = require('path')
const CopyWebpackPlugin   = require('copy-webpack-plugin')
const HtmlWebpackPlugin   = require('html-webpack-plugin')
const ManifestPlugin      = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const WebpackMd5Hash      = require('webpack-md5-hash')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    entry: {
        app:      path.join(__dirname, 'render.client.tsx'),
        external: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
        ],
    },

    output: {
        path:       path.resolve(__dirname, '../../../.built/web'),
        filename:   '[name].[chunkhash].js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.svg', '.jpeg', '.png', '.gif'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: 'ts-loader', options: {
                compilerOptions: isProd ? {
                    target: 'es5',
                } : null,
            },
            },
            {
                test:    /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    // 'file-loader?name=[sha1:hash:hex:32].[ext]',
                    'url-loader?limit=10240&name=[sha1:hash:hex:32].[ext]',
                    'image-webpack-loader',
                ],
            },
            {
                test:    /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },

    devServer: {
        contentBase:        '/',
        historyApiFallback: true,
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['external', 'manifest'],
        }),
        new WebpackMd5Hash(),
        new ManifestPlugin(),
        new ChunkManifestPlugin({
            filename:         'chunk-manifest.json',
            manifestVariable: 'webpackManifest',
        }),
        new CopyWebpackPlugin([
            {from: 'about.html', to: '.'},
        ]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            inject:   'body',
        }),
    ],

}
