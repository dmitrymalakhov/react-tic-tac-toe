const Statistic = require('./Statistic');
const Query = require('./Query');
const Mutation = require('./Mutation');
const Subscription = require('./Subscription');

const typeDefs = [Statistic, Query, Mutation, Subscription];

module.exports = typeDefs;
