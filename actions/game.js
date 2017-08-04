/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';

export const configureGame = createAction(
  'CONFIGURE_GAME',
  (size, players) => ({ size, players }),
);

export const toggleCellMode = createAction(
  'TOGGLE_CELL_MODE',
  (rowNum, cellNum) => ({ rowNum, cellNum })
);

export const togglePlayer = createAction('TOGGLE_PLAYER');

export const changeCellMode = (rowNum, cellNum) => dispatch => {
  dispatch(toggleCellMode(rowNum, cellNum));
  dispatch(togglePlayer());
};
