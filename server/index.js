/**
* @author Dmitry Malakhov
*/

'use strict';

const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { schema } = require('./data/schema.js');
const { GRAPHQL_PORT } = require('../constants/port');
const { execute, subscribe } = require('graphql');

const appWS = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

const subscriptionServer = new SubscriptionServer(
  {
    schema,
    execute,
    subscribe,
  }, {
    server: appWS,
    path: '/',
  }
);

appWS.listen(5000, () => {
  console.log('Websocket listening on port 5000');
});

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress(request =>
  ({
    schema,
    context: {
      authToken: parseInt(request.headers.authtoken, 10),
    },
  })
));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:5000/',
}));

graphQLServer.listen(GRAPHQL_PORT);
