/**
 * @author Dmitry Malakhov
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  { config, PATH_DIST } = require('./shared.config'),
  { APP_PORT, GRAPHQL_PORT } = require('../constants/port');

module.exports = merge.smart(config('development'), {
  entry: {
    main: [
      `webpack-dev-server/client?http://0.0.0.0:${APP_PORT}/`,
      'webpack/hot/dev-server',
    ],
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
    port: process.env.DEV_PORT || APP_PORT,
    host: process.env.DEV_HOST || '0.0.0.0',
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    proxy: { '/graphql': `http://0.0.0.0:${GRAPHQL_PORT}` },
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
