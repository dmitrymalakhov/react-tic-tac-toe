/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { redirectToPath } from '../actions/app';
import { ROOT_ROUTE } from '../constants/route';

const initiaState = {
  routeName: ROOT_ROUTE,
};

export default createReducer({
  [redirectToPath]: (state, payload) => ({ ...state, routeName: payload }),
}, initiaState);
