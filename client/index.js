/**
 * @author Dmitry Malakhov
 */

'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackConfig = require('./build-conf/webpack.config');
const { APP_PORT } = require('../constants/port');

const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const app = new WebpackDevServer(compiler, webpackConfig.devServer);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is now running on http://0.0.0.0:${APP_PORT}`);
});
