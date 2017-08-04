/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';
import { redirectToPath } from './app';

const MAIN_DIAGONAL_TYPE = 1;
const ANTIDIAGONAL_TYPE = 2;
const CENTER_TYPE = 0;

const checkRow = (playingboard, rowNum) => {
  const size = playingboard.size;
  let result = 0;

  for (let columnNum = 0; columnNum < size; columnNum++)
    result += playingboard.getIn([rowNum, columnNum]);

  return Math.abs(result) === size;
};

const checkColumn = (playingboard, columnNum) => {
  const size = playingboard.size;
  let result = 0;

  for (let rowNum = 0; rowNum < size; rowNum++)
    result += playingboard.getIn([rowNum, columnNum]);

  return Math.abs(result) === size;
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

const checkMainDiagonal = playingboard => {
  const size = playingboard.size;
  let result = 0;

  for (let index = 0; index < size; index++)
    result += playingboard.getIn([index, index]);

  return Math.abs(result) === size;
};

const checkAntidiagonal = playingboard => {
  const size = playingboard.size;
  let result = 0;

  for (let index = 0; index < size; index++)
    result += playingboard.getIn([size - index - 1, index]);

  return Math.abs(result) === size;
};

const checkDiagonals = (playingboard, lastRowNum, lastColumnNum) => {
  const typeDiagonal = getDiagonalType(playingboard, lastRowNum, lastColumnNum);

  if (typeDiagonal === MAIN_DIAGONAL_TYPE)
    return checkMainDiagonal(playingboard);

  if (typeDiagonal === ANTIDIAGONAL_TYPE)
    return checkAntidiagonal(playingboard);

  return checkMainDiagonal(playingboard) || checkAntidiagonal(playingboard);
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
        lastSelectedCell: [
          lastRowNum,
          lastColumnNum,
        ],
      },
    } = getState();

  if (
    checkRow(playingboard, lastRowNum) ||
    checkColumn(playingboard, lastColumnNum) ||
    checkDiagonals(playingboard, lastRowNum, lastColumnNum)
  ) {
    dispatch(endGame());
    dispatch(redirectToPath('/finish'));
  } else {
    dispatch(togglePlayer());
  }
};

export const changeCellMode = (rowNum, cellNum) => (dispatch, getState) => {
  const { game: { playingboard, moveAmount, size } } = getState();

  if (playingboard.getIn([rowNum, cellNum]) === 0) {
    dispatch(toggleCellMode(rowNum, cellNum));

    if (moveAmount >= size * 2 - 2)
      dispatch(checkOutGame());
    else
      dispatch(togglePlayer());
  }
};

export const gameConfiguredComplete = createAction(
  'CONFIGURE_GAME',
  (size, players) => ({ size, players }),
);

export const configureGame = (size, players) => dispatch => {
  dispatch(gameConfiguredComplete(size, players));
  dispatch(redirectToPath('/playingboard'));
};

export const resetGameState = createAction('RESET_GAME');

export const restartGame = () => dispatch => {
  dispatch(resetGameState());
  dispatch(redirectToPath('/configure'));
};
