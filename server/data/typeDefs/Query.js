const Statistic = require('./Statistic');

const Query = `
  type Query {
    statistics: [Statistic]
    statistic(id: ID!): Statistic
  }
`;

module.exports = () => [Query, Statistic];
