/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { configureGame } from '../actions/game';

const initiaState = {
  size: 3,
  players: [],
};

export default createReducer({
  [configureGame]: (state, payload) => ({ ...state, ...payload }),
}, initiaState);
