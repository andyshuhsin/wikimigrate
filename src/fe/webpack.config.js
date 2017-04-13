const webpack = require('webpack')
const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: {
        app: path.join(__dirname, "main.tsx"),
        external: [
            "react",
            "react-dom",
            "redux",
        ],
    },

    output: {
        path: path.resolve(__dirname, "built"),
        filename: "[name].[chunkhash].js"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.svg', '.jpeg', '.png', '.gif'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: 'ts-loader', options: {
                compilerOptions: (process.env.NODE_ENV === 'production') ? {
                    target: "es5"
                } : null
            }
            },
            {
                test:    /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    // 'file-loader?name=[sha1:hash:hex:32].[ext]',
                    'url-loader?limit=10240&name=[sha1:hash:hex:32].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'external',
            minChunks: Infinity,
            filename: '[name].[chunkhash].js',
        }),
        new CopyWebpackPlugin([
            {from: 'about.html', to: '.'},
        ]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
    ],

}
