/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Playingboard from '../models/playingboard';
import { redirectToPath } from '../actions/app';
import { changeCellMode } from '../actions/game';
import { Button } from '../components/Button';
import { Cell } from '../components/Cell';
import { Row } from '../components/Row';
import RouteContainer from '../containers/RouteContainer';

import PlayingboardRouteContainer from
  '../containers/PlayingboardRouteContainer';

import { noop } from '../utils/misc';

const propTypes = {
  size: PropTypes.number,
  playingboard: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list,
  ),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  currentPlayer: PropTypes.number,
  onRedirectToPath: PropTypes.func,
  onChangeCellMode: PropTypes.func,
};

const defaultProps = {
  size: 3,
  playingboard: Playingboard,
  currentPlayer: 0,
  players: [
    { name: '' },
  ],
  onRedirectToPath: noop,
  onChangeCellMode: noop,
};

class PlayingboardRoute extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.playingboard !== this.props.playingboard)
      return true;

    return false;
  }

  _handleRedirectToConfigure = () => {
    this.props.onRedirectToPath('/configure');
  }

  _handleChangeModeCell = (rowNum, cellNum) => {
    this.props.onChangeCellMode(rowNum, cellNum);
  }

  _renderRows() {
    return Array.from({ length: this.props.size }, (value, rowNum) => {
      const cells = Array.from(
        { length: this.props.size },
        (value, cellNum) => (
          <Cell
            key={cellNum}
            num={cellNum}
            row={rowNum}
            mode={this.props.playingboard.getIn([rowNum, cellNum])}
            onClick={this._handleChangeModeCell}
          />
        ),
      );

      return (
        <Row key={rowNum}>
          {cells}
        </Row>
      );
    });
  }

  _renderPlayerName() {
    const { currentPlayer, players } = this.props;

    const label = `The player ${players[currentPlayer].name}`;
    return (
      <div>
        {label}
      </div>
    );
  }

  render() {
    const rows = this._renderRows(),
      playerName = this._renderPlayerName();

    return (
      <RouteContainer>
        <PlayingboardRouteContainer>
          { playerName }
          { rows }
          <Button
            label="Back to configure"
            onClick={this._handleRedirectToConfigure}
          />
        </PlayingboardRouteContainer>
      </RouteContainer>
    );
  }
}

PlayingboardRoute.propTypes = propTypes;
PlayingboardRoute.defaultProps = defaultProps;
PlayingboardRoute.displayName = 'PlayingboardRoute';

const mapStateToProps = ({ game }) => ({
  playingboard: game.playingboard,
  players: game.players,
  currentPlayer: game.currentPlayer,
  size: game.size,
});

const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
  onChangeCellMode: (rowNum, cellNum) =>
    void dispatch(changeCellMode(rowNum, cellNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingboardRoute);
