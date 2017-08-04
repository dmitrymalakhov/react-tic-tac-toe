/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { configureGame } from '../actions/game';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import RouteContainer from '../containers/RouteContainer';
import ConfigureRouteContainer from '../containers/ConfigureRouteContainer';
import { noop } from '../utils/misc';

const propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  onConfigureGame: PropTypes.func,
};

const defaultProps = {
  players: [
    {
      name: '',
    },
  ],
  onConfigureGame: noop,
};

class ConfigureRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerName1: props.players[0].name,
      playerName2: props.players[1].name,
      size: 3,
    };
  }

  _handleClickStartGame = () => {
    const { size, playerName1, playerName2 } = this.state;

    const players = [
      {
        name: playerName1,
      },
      {
        name: playerName2,
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
      <RouteContainer>
        <ConfigureRouteContainer>
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
        </ConfigureRouteContainer>
      </RouteContainer>
    );
  }
}

ConfigureRoute.propTypes = propTypes;
ConfigureRoute.defaultProps = defaultProps;
ConfigureRoute.displayName = 'ConfigureRoute';

const mapStateToProps = ({ game }) => ({
  players: game.players,
});

const mapDispatchToProps = dispatch => ({
  onConfigureGame: (size, players) =>
    void dispatch(configureGame(size, players)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureRoute);
