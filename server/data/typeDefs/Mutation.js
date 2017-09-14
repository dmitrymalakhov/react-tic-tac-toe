const Statistic = require('./Statistic');

const Mutation = `
  type Mutation {
    addStatistic(score: Int!): Statistic
  }
`;

module.exports = () => [Mutation, Statistic];
