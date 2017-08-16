module.exports.Statistics = {};

let nextId = 0;
const statById = [];

const viewer = {};

module.exports.getViewer = () => viewer;

const addStatisticsPlayedGame = (name1, name2, playerWin, score) => {
  const id = `${nextId++}`;

  statById.push({
    id,
    playerName1: name1,
    playerName2: name2,
    playerWin,
    score,
  });

  return id;
};

module.exports.getStatisticById = id => statById.filter(item => item.id === id);
module.exports.getAllStatistic = () => statById;

addStatisticsPlayedGame('Player1', 'Player2', 1, 300);
addStatisticsPlayedGame('Player1', 'Player2', 0, 600);
