/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartGame } from '../../actions/game';
import Button from '../../components/Button';
import RouteContainer from '../styled/RouteContainer';
import FinishRouteStyled from './styled/FinishRouteStyled';
import { PlayersPropTypes, PlayersDefaultProps } from '../../models/players';
import { noop } from '../../../utils/misc';

const propTypes = {
  players: PlayersPropTypes,
  currentPlayer: PropTypes.number,
  onRestartGame: PropTypes.func,
};

const defaultProps = {
  players: PlayersDefaultProps,
  currentPlayer: 0,
  onRestartGame: noop,
};

class FinishRoute extends PureComponent {
  _handleClickRestartGame = () => {
    this.props.onRestartGame();
  }

  render() {
    const { players, currentPlayer } = this.props,
      playerName = players.getIn([currentPlayer, 'name']);

    return (
      <RouteContainer>
        <FinishRouteStyled>
          Win {playerName}
          <Button label="Restart game" onClick={this._handleClickRestartGame} />
        </FinishRouteStyled>
      </RouteContainer>
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

const mapDispatchToProps = dispatch => ({
  onRestartGame: () => void dispatch(restartGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishRoute);
