const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const {
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
});
