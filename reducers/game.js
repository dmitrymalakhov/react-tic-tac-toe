/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';

import {
  gameConfiguredComplete,
  toggleCellMode,
  togglePlayer,
  gameEnd,
} from '../actions/game';

import {
  DEFAULT_SIZE_PLAYINGBOARD,
  GAME_CONFIGURE,
  GAME_RUN,
  GAME_END,
} from '../constants/game';
import Playingboard from '../models/playingboard';

const initialState = {
  size: DEFAULT_SIZE_PLAYINGBOARD,
  players: [
    { name: 'Player #1' },
    { name: 'Player #2' },
  ],
  playingboard: Playingboard,
  currentPlayer: 0,
  moveAmount: 0,
  status: GAME_CONFIGURE,
};

export default createReducer({
  [gameConfiguredComplete]: (state, payload) => ({
    ...state,
    ...payload,
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
}, initialState);
