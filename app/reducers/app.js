/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { redirectToPath } from '../actions/app';

const initiaState = {
  routeName: '/',
};

export default createReducer({
  [redirectToPath]: (state, payload) => ({ ...state, routeName: payload }),
}, initiaState);
