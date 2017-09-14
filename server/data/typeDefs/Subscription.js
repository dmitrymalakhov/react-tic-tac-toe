const Statistic = require('./Statistic');

const Subscription = `
  type Subscription {
    statisticAdded: Statistic
  }
`;

module.exports = () => [Subscription, Statistic];
