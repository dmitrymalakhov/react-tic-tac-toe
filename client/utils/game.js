import { List } from 'immutable';

export const checkRow = (playingboard, rowNum, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let columnNum = 0; columnNum < size; columnNum++) {
    const nextValue = playingboard.getIn([rowNum, columnNum]);

    if (nextValue)
      result += nextValue;
    else
      result = 0;

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

export const checkColumn = (playingboard, columnNum, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let rowNum = 0; rowNum < size; rowNum++) {
    const nextValue = playingboard.getIn([rowNum, columnNum]);

    if (nextValue)
      result += nextValue;
    else
      result = 0;

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const checkMainDiagonal = (
  playingboard,
  amountCellsToWin,
  lastRowNum,
  lastColumnNum,
) => {
  const size = playingboard.size;
  let result = 1;

  const mustBeValue = playingboard.getIn([lastRowNum, lastColumnNum]);

  let index = 1,
    neededNext = true;

  while (
    lastRowNum - index >= 0 &&
    lastColumnNum + index <= size &&
    neededNext
  ) {
    const nextRowNum = lastRowNum - index;
    const nextColumnNum = lastColumnNum + index;
    const nextCellValue = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  index = 1;
  neededNext = true;

  while (
    lastRowNum + index <= size &&
    lastColumnNum - index >= 0 &&
    neededNext
  ) {
    const nextRowNum = lastRowNum + index;
    const nextColumnNum = lastColumnNum - index;
    const nextCellValue = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  return false;
};

const checkAntidiagonal = (
  playingboard,
  amountCellsToWin,
  lastRowNum,
  lastColumnNum,
) => {
  const size = playingboard.size;
  let result = 1;

  const mustBeValue = playingboard.getIn([lastRowNum, lastColumnNum]);

  let index = 1,
    neededNext = true;

  while (
    lastRowNum - index >= 0 &&
    lastColumnNum - index >= 0 &&
    neededNext
  ) {
    const nextRowNum = lastRowNum - index;
    const nextColumnNum = lastColumnNum - index;
    const nextCellValue = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  index = 1;
  neededNext = true;

  while (
    lastRowNum + index <= size &&
    lastColumnNum + index <= size &&
    neededNext
  ) {
    const nextRowNum = lastRowNum + index;
    const nextColumnNum = lastColumnNum + index;
    const nextCellValue = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  return false;
};

export const checkDiagonals = (
  playingboard,
  lastRowNum,
  lastColumnNum,
  amountCellsToWin,
) => {
  const mainDiagonalIsComplete = checkMainDiagonal(
    playingboard,
    amountCellsToWin,
    lastRowNum,
    lastColumnNum,
  );

  const antidiagonalIsComplete = checkAntidiagonal(
    playingboard,
    amountCellsToWin,
    lastRowNum,
    lastColumnNum,
  );

  return mainDiagonalIsComplete || antidiagonalIsComplete;
};

export const countInitScores = (size, players, amountCellsToWin) => List(
  Array.from(
    { length: players.size },
    () => size * amountCellsToWin,
  )
);

export const countCostOfMove = (size, players, score) =>
  score.map(score => score / ((size * size) / 2));

export const recalculateScore = (score, costOfMove, currentPlayer) =>
  score.update(
    currentPlayer,
    value => value - costOfMove.get(currentPlayer),
  );
