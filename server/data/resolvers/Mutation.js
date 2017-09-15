const pubsub = require('./pubsub');
const { addStatisticsPlayedGame } = require('../database');

const Mutation = {
  addStatistic: (root, { score }) => {
    const entry = addStatisticsPlayedGame('p1', 'p2', 0, score);

    pubsub.publish('statisticAdded', JSON.stringify({ entry }));

    return entry;
  },
};

module.exports = Mutation;
