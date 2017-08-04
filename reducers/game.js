/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';

import {
  configureGame,
  toggleCellMode,
  togglePlayer,
} from '../actions/game';

import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';
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
};

export default createReducer({
  [configureGame]: (state, payload) => ({ ...state, ...payload }),
  [toggleCellMode]: (state, { rowNum, cellNum }) => ({
    ...state,
    playingboard: state.playingboard.setIn(
      [rowNum, cellNum],
      state.currentPlayer === 1 ? 1 : -1,
    ),
    lastCell: [rowNum, cellNum],
    moveAmount: state.moveAmount + 1,
  }),
  [togglePlayer]: state => ({
    ...state,
    currentPlayer: state.currentPlayer ? 0 : 1,
  }),
}, initialState);
