/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { PlayersPropTypes, PlayersDefaultProps } from '../../models/players';
import { ScorePropTypes, ScoreDefaultProps } from '../../models/score';
import UserInfo from './UserInfo';
import GameInfoStyled from './styled/GameInfoStyled';

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

const GameInfo = ({ players, score, currentPlayer }) => {
  const usersInformation = players.map((player, index) => (
    <UserInfo
      key={player.name}
      name={player.name}
      score={score.get(index)}
      active={currentPlayer === index}
    />
  ));

  return (
    <GameInfoStyled>
      {usersInformation}
    </GameInfoStyled>
  );
};

GameInfo.propTypes = propTypes;
GameInfo.defaultProps = defaultProps;
GameInfo.displayName = 'GameInfo';

export default GameInfo;
