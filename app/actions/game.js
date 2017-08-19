/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';
import { redirectToPath } from './app';

const MAIN_DIAGONAL_TYPE = 1;
const ANTIDIAGONAL_TYPE = 2;
const CENTER_TYPE = 0;

const checkRow = (playingboard, rowNum, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let columnNum = 0; columnNum < size; columnNum++) {
    result += playingboard.getIn([rowNum, columnNum]);

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const checkColumn = (playingboard, columnNum, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let rowNum = 0; rowNum < size; rowNum++) {
    result += playingboard.getIn([rowNum, columnNum]);

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const getDiagonalType = (lastRowNum, lastColumnNum, size) => {
  const center = size / 2;

  if (
    lastRowNum < center && lastColumnNum < center ||
    lastRowNum > center && lastColumnNum > center
  )
    return MAIN_DIAGONAL_TYPE;

  if (
    lastRowNum < center && lastColumnNum > center ||
    lastRowNum > center && lastColumnNum < center
  )
    return ANTIDIAGONAL_TYPE;

  return CENTER_TYPE;
};

const checkMainDiagonal = (playingboard, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let index = 0; index < size; index++) {
    result += playingboard.getIn([index, index]);

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const checkAntidiagonal = (playingboard, amountCellsToWin) => {
  const size = playingboard.size;
  let result = 0;

  for (let index = 0; index < size; index++) {
    result += playingboard.getIn([size - index - 1, index]);

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const checkDiagonals = (
  playingboard,
  lastRowNum,
  lastColumnNum,
  amountCellsToWin,
) => {
  const typeDiagonal = getDiagonalType(playingboard, lastRowNum, lastColumnNum);

  if (typeDiagonal === MAIN_DIAGONAL_TYPE)
    return checkMainDiagonal(playingboard, amountCellsToWin);

  if (typeDiagonal === ANTIDIAGONAL_TYPE)
    return checkAntidiagonal(playingboard, amountCellsToWin);

  return checkMainDiagonal(playingboard, amountCellsToWin) ||
    checkAntidiagonal(playingboard, amountCellsToWin);
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
