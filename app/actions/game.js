/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';
import { redirectToPath } from './app';

const checkRow = (playingboard, rowNum, amountCellsToWin) => {
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

const checkColumn = (playingboard, columnNum, amountCellsToWin) => {
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

const checkDiagonals = (
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

export const toggleCellMode = createAction(
  'TOGGLE_CELL_MODE',
  (rowNum, cellNum) => ({ rowNum, cellNum })
);

export const togglePlayer = createAction('TOGGLE_PLAYER');

export const endGame = createAction('END_GAME');

const checkOutGame = () => (dispatch, getState) => {
  const {
    game:
      {
        playingboard,
        amountCellsToWin,
        lastSelectedCell: [
          lastRowNum,
          lastColumnNum,
        ],
      },
    } = getState();

  if (
    checkRow(playingboard, lastRowNum, amountCellsToWin) ||
    checkColumn(playingboard, lastColumnNum, amountCellsToWin) ||
    checkDiagonals(playingboard, lastRowNum, lastColumnNum, amountCellsToWin)
  ) {
    dispatch(endGame());
    dispatch(redirectToPath('/finish'));
  } else {
    dispatch(togglePlayer());
  }
};

export const changeCellMode = (rowNum, cellNum) => (dispatch, getState) => {
  const { game: { playingboard, moveAmount, amountCellsToWin } } = getState();

  if (playingboard.getIn([rowNum, cellNum]) === 0) {
    dispatch(toggleCellMode(rowNum, cellNum));

    if (moveAmount >= amountCellsToWin * 2 - 2)
      dispatch(checkOutGame());
    else
      dispatch(togglePlayer());
  }
};

export const gameConfiguredComplete = createAction(
  'CONFIGURE_GAME',
  (size, players, amountCellsToWin) => ({ size, players, amountCellsToWin }),
);

export const configureGame = (size, players, amountCellsToWin) => dispatch => {
  dispatch(gameConfiguredComplete(size, players, amountCellsToWin));
  dispatch(redirectToPath('/playingboard'));
};

export const resetGameState = createAction('RESET_GAME');

export const restartGame = () => dispatch => {
  dispatch(resetGameState());
  dispatch(redirectToPath('/configure'));
};
