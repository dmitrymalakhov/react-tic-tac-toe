/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createAction } from 'redux-act';

export const configureGame = createAction(
  'CONFIGURE_GAME',
  (size, players) => ({ size, players }),
);
