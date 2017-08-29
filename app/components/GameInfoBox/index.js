/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { PlayersPropTypes, PlayersDefaultProps } from '../../models/players';
import { ScorePropTypes, ScoreDefaultProps } from '../../models/score';
import UserInfo from './UserInfo';
import GameInfoBoxStyled from './styled/GameInfoBoxStyled';

const propTypes = {
  players: PlayersPropTypes,
  score: ScorePropTypes,
  currentPlayer: PropTypes.number,
};

const defaultProps = {
  players: PlayersDefaultProps,
  score: ScoreDefaultProps,
  currentPlayer: 0,
};

const GameInfoBox = props => {
  const usersInformation = props.players.map((player, index) => (
    <UserInfo
      key={player.name}
      name={player.name}
      score={props.score[index]}
      active={props.currentPlayer === index}
    />
  ));

  return (
    <GameInfoBoxStyled>
      {usersInformation}
    </GameInfoBoxStyled>
  );
};

GameInfoBox.propTypes = propTypes;
GameInfoBox.defaultProps = defaultProps;
GameInfoBox.displayName = 'GameInfoBox';

export default GameInfoBox;
