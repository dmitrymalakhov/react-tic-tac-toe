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
import Players, { Player } from '../models/players';
import Score from '../models/score';

const initialState = {
  size: DEFAULT_SIZE_PLAYINGBOARD,
  amountCellsToWin: DEFAULT_SIZE_PLAYINGBOARD,
  players: Players,
  playingboard: Playingboard,
  score: Score,
  currentPlayer: 0,
  moveAmount: 0,
  status: GAME_CONFIGURE,
};

const playersToList = players => List(players.map(item => new Player(item)));

export default createReducer({
  [gameConfiguredComplete]: (state, { players, size, amountCellsToWin }) => ({
    ...state,
    players: playersToList(players),
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
