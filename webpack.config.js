const path = require('path');
const webpack = require('webpack')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: 'coffee-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ],
  },
  externals: [
    'jquery'
  ],
  entry: './package/src/index.js',
  output: {
    library: '@tomasc/recurring-select',
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, 'package/dist')
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  resolve: {
    extensions: ['.coffee', '.js']
  }
};
