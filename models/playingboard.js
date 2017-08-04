/**
 * @author Dmitry Malakhov
 */

'use strict';

import { List } from 'immutable';
import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';

const MATRIX_GENERATOR_CONFIG = { length: DEFAULT_SIZE_PLAYINGBOARD };

const initialMatrix = Array.from(MATRIX_GENERATOR_CONFIG, () =>
  List(Array.from(MATRIX_GENERATOR_CONFIG, () => 0))
);

const Playingboard = List(initialMatrix);

export default Playingboard;
