/**
 * @author Dmitry Malakhov
 */

'use strict';

import { List, Record } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const Player = Record({
  name: '',
});

const player1 = new Player({ name: 'Player 1' }),
  player2 = new Player({ name: 'Player 2' });

const Players = List([player1, player2]);

export const PlayersDefaultProps = Players;

export const PlayersPropTypes = ImmutablePropTypes.listOf(
  ImmutablePropTypes.recordOf({
    name: PropTypes.string,
  }),
);

export default Players;
