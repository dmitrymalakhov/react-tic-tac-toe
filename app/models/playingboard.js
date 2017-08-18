/**
 * @author Dmitry Malakhov
 */

'use strict';

import { List } from 'immutable';
import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';

const matrixGeneratorConfig = size => ({ length: size });

export const initialMatrix = size => Array.from(
  matrixGeneratorConfig(size),
  () => List(Array.from(matrixGeneratorConfig(size), () => 0)),
);

const Playingboard = List(initialMatrix(DEFAULT_SIZE_PLAYINGBOARD));

export default Playingboard;
