/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';
import { redirectToPath } from './app';
import { checkRow, checkColumn, checkDiagonals } from '../utils/game';

import {
  CONFIGURE_ROUTE,
  PLAYINGBOARD_ROUTE,
  FINISH_ROUTE,
} from '../constants/route';

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
    dispatch(redirectToPath(FINISH_ROUTE));
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

const countInitScores = (size, players, amountCellsToWin) =>
  Array.from({ length: players.length }, () =>
    size * amountCellsToWin / players.length);


export const gameConfiguredComplete = createAction(
  'CONFIGURE_GAME',
  (size, players, amountCellsToWin) => ({
    size,
    players,
    amountCellsToWin,
    score: countInitScores(size, players, amountCellsToWin),
    costOfMove: 0,
  }),
);

export const configureGame = (size, players, amountCellsToWin) => dispatch => {
  dispatch(gameConfiguredComplete(size, players, amountCellsToWin));
  dispatch(redirectToPath(PLAYINGBOARD_ROUTE));
};

export const resetGameState = createAction('RESET_GAME');

export const restartGame = () => dispatch => {
  dispatch(resetGameState());
  dispatch(redirectToPath(CONFIGURE_ROUTE));
};
