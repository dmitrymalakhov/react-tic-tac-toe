/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { configureGame } from '../actions/game';
import { PlaygroundContainer } from '../components/PlaygroundContainer';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { noop } from '../utils/misc';

const propTypes = {
  onConfigureGame: PropTypes.func,
};

const defaultProps = {
  onConfigureGame: noop,
};

class RootRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerName1: '',
      playerName2: '',
      size: 3,
    };
  }

  _handleClickStartGame = () => {
    const { size, playerName1, playerName2 } = this.state;

    const players = [
      {
        name: playerName1 || 'Player #1',
      },
      {
        name: playerName2 || 'Player #2',
      },
    ];

    this.props.onConfigureGame(size, players);
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

  render() {
    return (
      <PlaygroundContainer>
        <Input
          label="Player #1"
          placeholder="Name"
          value={this.state.playerName1}
          onChange={this._handleChangePlayerName1}
        />
        <Input
          label="Player #2"
          placeholder="Name"
          value={this.state.playerName2}
          onChange={this._handleChangePlayerName2}
        />
        <Button
          label="To start the battle!"
          onClick={this._handleClickStartGame}
        />
      </PlaygroundContainer>
    );
  }
}

RootRoute.propTypes = propTypes;
RootRoute.defaultProps = defaultProps;
RootRoute.displayName = 'RootRoute';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onConfigureGame: (size, players) =>
    void dispatch(configureGame(size, players)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootRoute);
