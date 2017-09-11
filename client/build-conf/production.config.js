/**
 * @author Dmitry Malakhov
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  { config } = require('./shared.config');

module.exports = merge(config('production'), {
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  profile: true,
  cache: false,
  watch: false,
  stats: {
    assets: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    reasons: false,
    source: false,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 800000,
    maxEntrypointSize: 1000000,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      cache: false,
      minify: {
        removeAttributeQuotes: true,
        caseSensitive: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        warnings: false,
      },
      comments: false,
    }),
  ],
});
