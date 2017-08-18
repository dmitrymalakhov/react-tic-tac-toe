const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const {
  addStatisticsPlayedGame,
  getAllStatistic,
  getStatisticById,
} = require('./database');

const { isUndef } = require('../utils/misc');

const StatisticItem = new GraphQLObjectType({
  name: 'StatisticItem',
  fields: {
    id: { type: GraphQLInt },
    score: { type: GraphQLInt },
    playerName1: { type: GraphQLString },
    playerName2: { type: GraphQLString },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStatistic: {
      type: StatisticItem,
      args: {
        score: { type: GraphQLInt },
      },
      resolve(root, { score }) {
        return addStatisticsPlayedGame('p1', 'p2', 0, score);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    statistics: {
      args: {
        id: { type: GraphQLString },
      },
      type: new GraphQLList(StatisticItem),
      resolve(root, { id }) {
        return isUndef(id)
          ? getAllStatistic()
          : getStatisticById(id);
      },
    },
  },
});

module.exports.schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
