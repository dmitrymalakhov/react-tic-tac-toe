/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import ChoiceTypeRouteStyled from './styled/ChoiceTypeRouteStyled';
import RouteContainer from '../styled/RouteContainer';
import { initTypeOfGame } from '../../actions/game';
import { noop } from '../../../utils/misc';

import {
  HOTSEAT,
  PLAYER_VS_COMPUTER,
  MULTIPLAYER,
} from '../../constants/game';

const propTypes = {
  onInitTypeOfGame: PropTypes.func,
};

const defaultProps = {
  onInitTypeOfGame: noop,
};

class ChoiceTypeRoute extends PureComponent {
  _handleClickHotseat = () => {
    this.props.onInitTypeOfGame(HOTSEAT);
  }

  _handleClickPVC = () => {
    this.props.onInitTypeOfGame(PLAYER_VS_COMPUTER);
  }

  _handleClickMultiplayer = () => {
    this.props.onInitTypeOfGame(MULTIPLAYER);
  }

  render() {
    return (
      <RouteContainer>
        <ChoiceTypeRouteStyled>
          <Button
            key="hotseat"
            label="Player vs Player"
            onClick={this._handleClickHotseat}
          />
          <Button
            key="pvc"
            label="Player vs Computer"
            onClick={this._handleClickPVC}
            disabled
          />
          <Button
            key="mp"
            label="Multiplayer"
            onClick={this._handleClickMultiplayer}
            disabled
          />
        </ChoiceTypeRouteStyled>
      </RouteContainer>
    );
  }
}

ChoiceTypeRoute.propTypes = propTypes;
ChoiceTypeRoute.defaultProps = defaultProps;
ChoiceTypeRoute.displayName = 'ChoiceTypeRoute';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onInitTypeOfGame: type => void dispatch(initTypeOfGame(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceTypeRoute);
