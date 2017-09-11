/**
* @author Dmitry Malakhov
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { schema } = require('./data/schema.js');
const { GRAPHQL_PORT } = require('../constants/port');

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT);
