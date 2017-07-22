/**
 * @author Dmitry Malakhov
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  { config, PATH_DIST } = require('./shared.config');

module.exports = merge.smart(config('development'), {
  entry: {
    main: ['react-hot-loader/patch'],
  },
  devtool: 'cheap-module-source-map',
  profile: false,
  output: {
    pathinfo: true,
  },
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: PATH_DIST,
    port: process.env.DEV_PORT || 8090,
    host: process.env.DEV_HOST || '0.0.0.0',
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      cache: false,
      minify: false,
    }),
  ],
});
