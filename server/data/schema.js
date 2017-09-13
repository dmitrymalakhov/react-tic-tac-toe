const { PubSub } = require('graphql-subscriptions');

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

const pubsub = new PubSub();

const { isUndef } = require('../../utils/misc');

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
    addStatistic: {
      type: StatisticItem,
      args: {
        score: { type: GraphQLInt },
      },
      resolve(root, { score, broadcast }, context) {
        const entry = addStatisticsPlayedGame('p1', 'p2', 0, score);
        console.log(broadcast, context);
        pubsub.publish(
          'newStatistic',
          {
            entry,
            authToken: context.authToken,
            broadcast,
          },
        );

        return entry;
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

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    newStatistic: {
      type: StatisticItem,
      args: {
        score: { type: GraphQLInt },
      },
      resolve(message, variables, context, subscription) {
        console.log(`Serving subscription for user ${variables.userId}`);
        return message.entry;
      }
    }
  }
})

module.exports.schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
});

module.exports.pubsub = pubsub;
