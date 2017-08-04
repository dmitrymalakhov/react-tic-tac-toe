/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FinishRouteContainer from '../containers/FinishRouteContainer';

const propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  currentPlayer: PropTypes.number,
};

const defaultProps = {
  players: [
    {
      name: '',
    },
  ],
  currentPlayer: 0,
};

class FinishRoute extends PureComponent {
  render() {
    const { players, currentPlayer } = this.props,
      playerName = players[currentPlayer].name;

    return (
      <FinishRouteContainer>
        Win {playerName}
      </FinishRouteContainer>
    );
  }
}

FinishRoute.propTypes = propTypes;
FinishRoute.defaultProps = defaultProps;
FinishRoute.displayName = 'FinishRoute';

const mapStateToProps = ({ game }) => ({
  players: game.players,
  currentPlayer: game.currentPlayer,
});

export default connect(mapStateToProps)(FinishRoute);
