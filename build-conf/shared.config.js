/**
 * @author Dmitry Malakhov
 */

'use strict';

const { resolve } = require('path'),
  webpack = require('webpack');

const PATH_SOURCES = resolve(__dirname, '../');
const PATH_DIST = resolve(__dirname, '..', 'public');

const config = env => ({
  context: PATH_SOURCES,
  output: {
    path: PATH_DIST,
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[id].js',
    sourceMapFilename: '[name].map',
  },
  entry: {
    main: ['./index'],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?limit=5120&name=images/[name]-[hash].[ext]',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=fonts/[name]-[hash].[ext]',
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],
});

module.exports = { config, PATH_DIST };
