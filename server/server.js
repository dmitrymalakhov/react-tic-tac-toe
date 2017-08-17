const express = require('express');
const graphQLHTTP = require('express-graphql');

const { schema } = require('./data/schema.js');

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({
  schema,
  graphiql: true,
  pretty: true,
}));

graphQLServer.listen(GRAPHQL_PORT);
