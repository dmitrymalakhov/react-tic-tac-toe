/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { changeCellMode } from '../actions/game';
import Button from '../components/Button';
import GameInfoBox from '../components/GameInfoBox';
import Playingboard from '../components/Playingboard';
import RouteContainer from '../containers/RouteContainer';
import { PlayersPropTypes, PlayersDefaultProps } from '../models/players';
import { ScorePropTypes, ScoreDefaultProps } from '../models/score';

import {
  PlayingboardPropTypes,
  PlayingboardDefaultProps,
} from '../models/playingboard';

import PlayingboardRouteContainer from
  '../containers/PlayingboardRouteContainer';

import { CONFIGURE_ROUTE } from '../constants/route';
import { noop } from '../../utils/misc';

const propTypes = {
  playingboard: PlayingboardPropTypes,
  players: PlayersPropTypes,
  score: ScorePropTypes,
  currentPlayer: PropTypes.number,
  onRedirectToPath: PropTypes.func,
  onChangeCellMode: PropTypes.func,
};

const defaultProps = {
  playingboard: PlayingboardDefaultProps,
  players: PlayersDefaultProps,
  score: ScoreDefaultProps,
  currentPlayer: 0,
  onRedirectToPath: noop,
  onChangeCellMode: noop,
};

class PlayingboardRoute extends Component {
  _handleRedirectToConfigure = () => {
    this.props.onRedirectToPath(CONFIGURE_ROUTE);
  }

  render() {
    const {
      players,
      score,
      playingboard,
      currentPlayer,
      onChangeCellMode,
    } = this.props;

    return (
      <RouteContainer>
        <PlayingboardRouteContainer>
          <GameInfoBox
            players={players}
            score={score}
            currentPlayer={currentPlayer}
          />
          <Playingboard
            playingboard={playingboard}
            onChangeCellMode={onChangeCellMode}
          />
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
  score: game.score,
  currentPlayer: game.currentPlayer,
});

const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
  onChangeCellMode: (rowNum, cellNum) =>
    void dispatch(changeCellMode(rowNum, cellNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingboardRoute);
