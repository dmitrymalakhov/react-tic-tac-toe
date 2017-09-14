const Statistic = `
  type Statistic {
    id: ID!,
    score: Int!,
    playerName1: String,
    playerName2: String
  }
`;

module.exports = () => [Statistic];
