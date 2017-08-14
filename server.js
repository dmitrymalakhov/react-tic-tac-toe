const express = require('express');
const graphQLHTTP = require('express-graphql');

const schema = './data/schema.js';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({
  schema,
  pretty: true,
}));

graphQLServer.listen(GRAPHQL_PORT);
