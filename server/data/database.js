let nextId = 0;
const statById = [];

module.exports.addStatisticsPlayedGame = (name1, name2, playerWin, score) => {
  const item = {
    id: `${nextId++}`,
    playerName1: name1,
    playerName2: name2,
    playerWin,
    score,
  };

  statById.push(item);

  return item;
};

module.exports.getStatisticById = id => statById.filter(item => item.id === id);
module.exports.getAllStatistic = () => statById;
