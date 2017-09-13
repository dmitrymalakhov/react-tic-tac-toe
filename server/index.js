/**
* @author Dmitry Malakhov
*/

'use strict';

const { createServer } = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  { SubscriptionServer } = require('subscriptions-transport-ws'),
  { graphqlExpress, graphiqlExpress } = require('apollo-server-express'),
  { schema } = require('./data/schema.js'),
  { GRAPHQL_PORT, WS_PORT } = require('../constants/port'),
  { execute, subscribe } = require('graphql'),
  cors = require('cors');

const endpointURL = '/graphql';
const path = '/subscriptions';
const subscriptionsEndpoint = `ws://0.0.0.0:${WS_PORT}${path}`;
const graphQLServer = express();

graphQLServer.use('*', cors({ origin: `http://0.0.0.0:${GRAPHQL_PORT}` }));

graphQLServer.use(endpointURL, bodyParser.json(), graphqlExpress({ schema }));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL,
  subscriptionsEndpoint,
}));

graphQLServer.listen(GRAPHQL_PORT);

const server = createServer(graphQLServer);

server.listen(WS_PORT);

const subscriptionServer = new SubscriptionServer(
  { execute, subscribe, schema },
  { server, path },
);
