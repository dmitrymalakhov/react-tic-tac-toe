/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';
import { redirectToPath } from './app';

import {
  checkRow,
  checkColumn,
  checkDiagonals,
  countInitScores,
  countCostOfMove,
  recalculateScore,
} from '../utils/game';

import {
  CONFIGURE_ROUTE,
  PLAYINGBOARD_ROUTE,
  FINISH_ROUTE,
} from '../constants/route';

export const toggleCellMode = createAction(
  'TOGGLE_CELL_MODE',
  (rowNum, cellNum) => ({ rowNum, cellNum }),
);

export const updateScore = createAction(
  'UPDATE_SCORE',
  score => ({ score }),
);

export const togglePlayer = createAction('TOGGLE_PLAYER');

export const endGame = createAction('END_GAME');

const checkOutGame = () => (dispatch, getState) => {
  const { game } = getState();

  const {
    playingboard,
    amountCellsToWin,
    score,
    costOfMove,
    currentPlayer,
    lastSelectedCell: [
      lastRowNum,
      lastColumnNum,
    ],
  } = game;

  if (
    checkRow(playingboard, lastRowNum, amountCellsToWin) ||
    checkColumn(playingboard, lastColumnNum, amountCellsToWin) ||
    checkDiagonals(playingboard, lastRowNum, lastColumnNum, amountCellsToWin)
  ) {
    dispatch(endGame());
    dispatch(redirectToPath(FINISH_ROUTE));
  } else {
    dispatch(updateScore(recalculateScore(score, costOfMove, currentPlayer)));
    dispatch(togglePlayer());
  }
};

export const changeCellMode = (rowNum, cellNum) => (dispatch, getState) => {
  const { game } = getState();

  const {
    playingboard,
    moveAmount,
    amountCellsToWin,
    score,
    costOfMove,
    currentPlayer,
  } = game;

  if (playingboard.getIn([rowNum, cellNum]) === 0) {
    dispatch(toggleCellMode(rowNum, cellNum));

    if (moveAmount >= amountCellsToWin * 2 - 2) {
      dispatch(checkOutGame());
    } else {
      dispatch(updateScore(recalculateScore(score, costOfMove, currentPlayer)));
      dispatch(togglePlayer());
    }
  }
};

export const gameConfiguredComplete = createAction(
  'CONFIGURE_GAME',
  (size, players, amountCellsToWin) => {
    const score = countInitScores(size, players, amountCellsToWin),
      costOfMove = countCostOfMove(size, players, score);

    return {
      size,
      players,
      amountCellsToWin,
      score,
      costOfMove,
    };
  },
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
