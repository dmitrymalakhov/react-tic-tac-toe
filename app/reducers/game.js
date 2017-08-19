/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { List } from 'immutable';

import {
  gameConfiguredComplete,
  toggleCellMode,
  togglePlayer,
  gameEnd,
  resetGameState,
} from '../actions/game';

import {
  DEFAULT_SIZE_PLAYINGBOARD,
  GAME_CONFIGURE,
  GAME_RUN,
  GAME_END,
} from '../constants/game';

import Playingboard, { initialMatrix } from '../models/playingboard';

const initialState = {
  size: DEFAULT_SIZE_PLAYINGBOARD,
  amountCellsToWin: DEFAULT_SIZE_PLAYINGBOARD,
  players: [
    { name: 'Player #1' },
    { name: 'Player #2' },
  ],
  playingboard: Playingboard,
  currentPlayer: 0,
  moveAmount: 0,
  score: [0, 0],
  status: GAME_CONFIGURE,
};

export default createReducer({
  [gameConfiguredComplete]: (state, { players, size, amountCellsToWin }) => ({
    ...state,
    players,
    size,
    amountCellsToWin,
    playingboard: List(initialMatrix(size)),
    status: GAME_RUN,
  }),
  [toggleCellMode]: (state, { rowNum, cellNum }) => ({
    ...state,
    playingboard: state.playingboard.setIn(
      [rowNum, cellNum],
      state.currentPlayer === 1 ? 1 : -1,
    ),
    lastSelectedCell: [rowNum, cellNum],
    moveAmount: state.moveAmount + 1,
  }),
  [togglePlayer]: state => ({
    ...state,
    currentPlayer: state.currentPlayer ? 0 : 1,
  }),
  [gameEnd]: state => ({
    ...state,
    status: GAME_END,
  }),
  [resetGameState]: state => ({
    ...state,
    status: GAME_CONFIGURE,
    moveAmount: 0,
    playingboard: Playingboard,
  }),
}, initialState);
