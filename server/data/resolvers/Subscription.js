const { withFilter } = require('graphql-subscriptions');
const pubsub = require('./pubsub');

const filter = (payload, variables) => true;

const Subscription = {
  statisticAdded: {
    subscribe: withFilter(() => pubsub.asyncIterator('statisticAdded'), filter),
  },
};

module.exports = Subscription;
