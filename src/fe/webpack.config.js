const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './main.tsx',

  output: {
    path: path.resolve(__dirname, 'built'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg', '.jpeg', '.png', '.gif'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug'
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: '.' },
    ])
  ]

};