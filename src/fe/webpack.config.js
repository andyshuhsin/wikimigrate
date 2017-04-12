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
      { test: /\.tsx?$/, loader: 'ts-loader', options: {
        compilerOptions: (process.env.NODE_ENV === 'production') ? {
          target: "es5"
        } : null
      }},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            // 'file-loader?name=[sha1:hash:hex:32].[ext]',
            'url-loader?limit=10240&name=[sha1:hash:hex:32].[ext]',
            'image-webpack-loader'
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: '*.html', to: '.' },
    ])
  ]

};
