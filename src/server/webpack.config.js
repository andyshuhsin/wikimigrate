const webpack = require('webpack')
const path = require("path")

module.exports = {
    target: 'node',

    entry: {
        render: path.join(__dirname, "render.tsx"),
    },

    output: {
        path: path.resolve(__dirname, "..", "built", "web"),
        filename: '[name].bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.svg', '.jpeg', '.png', '.gif'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: 'ts-loader',
            },
            {
                test:    /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=10240&name=[sha1:hash:hex:32].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
    ],
}
