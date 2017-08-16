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

const StatisticItem = new GraphQLObjectType({
  name: 'StatisticItem',
  args: {
    id: { type: GraphQLString },
  },
  fields: {
    id: { type: GraphQLInt },
    score: { type: GraphQLInt },
    playerName1: { type: GraphQLString },
    playerName2: { type: GraphQLString },
  },
  resolve: (root, args) => getStatisticById(args.id),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    statistics: {
      type: new GraphQLList(StatisticItem),
      resolve: () => getAllStatistic(),
    },
  },
});

module.exports.schema = new GraphQLSchema({
  query: Query,
});
