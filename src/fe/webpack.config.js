const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './main.tsx',

  output: {
    path: path.resolve(__dirname, 'built'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: '.' },
    ])
  ]

};