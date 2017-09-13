const { PubSub } = require('graphql-subscriptions');
const { withFilter } = require('graphql-subscriptions');

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
      resolve(root, { message }, context) {
        const entry = addStatisticsPlayedGame('p1', 'p2', 0, 100);
        console.log('message', message);
        pubsub.publish(
          'newStatistic',
          entry
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
      subscribe: withFilter(
        () => pubsub.asyncIterator('addStatistic'),
        (payload, variables) => {
          console.log('payload', payload);
          return payload.channelId === variables.channelId;
        }
      ),
      resolve(message, variables, context, subscription) {
        console.log(`Serving subscription for user ${variables}`);
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
