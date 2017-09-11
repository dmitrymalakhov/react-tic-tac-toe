/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { configureGame } from '../actions/game';
import { redirectToPath } from '../actions/app';
import Button from '../components/Button';
import Input from '../components/Input';

import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';
import { CHOICE_TYPE_ROUTE } from '../constants/route';

import {
  Player,
  PlayersPropTypes,
  PlayersDefaultProps,
} from '../models/players';

import { noop, isNumeric, fastParseNumberFromString } from '../../utils/misc';

const propTypes = {
  players: PlayersPropTypes,
  size: PropTypes.number,
  amountCellsToWin: PropTypes.number,
  onConfigureGame: PropTypes.func,
  onRedirectToPath: PropTypes.func,
};

const defaultProps = {
  players: PlayersDefaultProps,
  size: DEFAULT_SIZE_PLAYINGBOARD,
  amountCellsToWin: DEFAULT_SIZE_PLAYINGBOARD,
  onConfigureGame: noop,
  onRedirectToPath: noop,
};

class ConfigureHotseatRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerName1: props.players.getIn([0, 'name']),
      playerName2: props.players.getIn([1, 'name']),
      amountCellsToWin: props.amountCellsToWin,
      size: props.size,
    };
  }

  _handleClickStartGame = () => {
    const { size, playerName1, playerName2, amountCellsToWin } = this.state;

    const players = List.of(
      new Player({ name: playerName1 }),
      new Player({ name: playerName2 }),
    );

    this.props.onConfigureGame(size, players, amountCellsToWin);
  }

  _handleClickRedirectToChoiceType = () => {
    this.props.onRedirectToPath(CHOICE_TYPE_ROUTE);
  }

  _handleChangePlayerName1 = value => {
    this.setState({
      playerName1: value,
    });
  }

  _handleChangePlayerName2 = value => {
    this.setState({
      playerName2: value,
    });
  }

  _handleChangeSize = value => {
    if (isNumeric(value) || !value) {
      this.setState({
        size: fastParseNumberFromString(value) || value,
      });
    }
  }

  _handleChangeAmountCellToWin = value => {
    if (isNumeric(value) || !value) {
      this.setState({
        amountCellsToWin: fastParseNumberFromString(value) || value,
      });
    }
  }

  render() {
    return ([
      <Input
        key="player1"
        label="Player #1"
        placeholder="Name"
        value={this.state.playerName1}
        onChange={this._handleChangePlayerName1}
      />,
      <Input
        key="player2"
        label="Player #2"
        placeholder="Name"
        value={this.state.playerName2}
        onChange={this._handleChangePlayerName2}
      />,
      <Input
        key="size"
        label="Size"
        placeholder="Default size: 3"
        value={this.state.size}
        onChange={this._handleChangeSize}
      />,
      <Input
        key="cellstowin"
        label="Cells to win"
        placeholder="Default cells to win: 3"
        value={this.state.amountCellsToWin}
        onChange={this._handleChangeAmountCellToWin}
      />,
      <Button
        key="start"
        label="To start the battle!"
        onClick={this._handleClickStartGame}
      />,
      <Button
        key="tomain"
        label="To main"
        onClick={this._handleClickRedirectToChoiceType}
      />,
    ]);
  }
}

ConfigureHotseatRoute.propTypes = propTypes;
ConfigureHotseatRoute.defaultProps = defaultProps;
ConfigureHotseatRoute.displayName = 'ConfigureHotseatRoute';

const mapStateToProps = ({ game: { players, amountCellsToWin, size } }) => ({
  players,
  amountCellsToWin,
  size,
});

const mapDispatchToProps = dispatch => ({
  onConfigureGame: (size, players, amountCellsToWin) =>
    void dispatch(configureGame(size, players, amountCellsToWin)),
  onRedirectToPath: path => void dispatch(redirectToPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureHotseatRoute);
