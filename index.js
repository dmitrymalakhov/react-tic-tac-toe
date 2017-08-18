const express = require('express');
const path = require('path');
const graphQLHTTP = require('express-graphql');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackConfig = require('./build-conf/webpack.config');
const { schema } = require('./data/schema.js');
const { GRAPHQL_PORT, APP_PORT } = require('./constants/port');

const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({
  schema,
  graphiql: true,
  pretty: true,
}));

graphQLServer.listen(GRAPHQL_PORT);

const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const app = new WebpackDevServer(compiler, webpackConfig.devServer);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://0.0.0.0:${APP_PORT}`);
});
