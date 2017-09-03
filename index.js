/**
* @author Dmitry Malakhov
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackConfig = require('./build-conf/webpack.config');
const { schema } = require('./data/schema.js');
const { GRAPHQL_PORT, APP_PORT } = require('./constants/port');

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT);

const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const app = new WebpackDevServer(compiler, webpackConfig.devServer);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is now running on http://0.0.0.0:${APP_PORT}`);
});
