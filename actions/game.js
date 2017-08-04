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

export const endGame = createAction('END_GAME');

const checkRow = (playingboard, rowNum, size) => {
  let result = 0;

  for (let columnNum = 0; columnNum < size; columnNum++)
    result += playingboard.getIn([rowNum, columnNum]);

  return Math.abs(result) === size;
};

const checkColumn = (playingboard, columnNum, size) => {
  let result = 0;

  for (let rowNum = 0; rowNum < size; rowNum++)
    result += playingboard.getIn([rowNum, columnNum]);

  return Math.abs(result) === size;
};

const checkOutGame = () => (dispatch, getState) => {
  const {
    game:
      {
        playingboard,
        lastCell: [
          rowNum,
          columnNum,
        ],
        size,
      },
    } = getState();

  if (
    checkRow(playingboard, rowNum, size) ||
    checkColumn(playingboard, columnNum, size)
  )
    dispatch(endGame());
  else
    dispatch(togglePlayer());
};

export const changeCellMode = (rowNum, cellNum) => (dispatch, getState) => {
  const { game: { playingboard, moveAmount, size } } = getState();

  if (playingboard.getIn([rowNum, cellNum]) === 0) {
    dispatch(toggleCellMode(rowNum, cellNum));

    if (moveAmount >= size * 2 - 2)
      dispatch(checkOutGame());
    else
      dispatch(togglePlayer());
  }
};
