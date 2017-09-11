/**
 * @author Dmitry Malakhov
 */

'use strict';

import { List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';

const matrixGeneratorConfig = size => ({ length: size });

export const initialMatrix = size => Array.from(
  matrixGeneratorConfig(size),
  () => List(Array.from(matrixGeneratorConfig(size), () => 0)),
);

const Playingboard = List(initialMatrix(DEFAULT_SIZE_PLAYINGBOARD));

export const PlayingboardPropTypes = ImmutablePropTypes.listOf(
  ImmutablePropTypes.listOf(
    PropTypes.number,
  ),
);

export const PlayingboardDefaultProps = Playingboard;

export default Playingboard;
