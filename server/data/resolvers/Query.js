const {
  getAllStatistic,
  getStatisticById,
} = require('../database');

const Query = {
  statistics: () => getAllStatistic(),
  statistic: (root, { id }) => getStatisticById(id),
};

module.exports = Query;
