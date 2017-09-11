/**
 * @author Dmitry Malakhov
 */

'use strict';

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

const Score = List([0, 0]);

export const ScorePropTypes = ImmutablePropTypes.listOf(PropTypes.number);
export const ScoreDefaultProps = Score;

export default Score;
