import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteStyled from '../styled/RouteStyled';
import ConfigureRouteStyled from './styled/ConfigureRouteStyled';
import ConfigureHotseat from '../../containers/ConfigureHotseat';

import {
  HOTSEAT,
  PLAYER_VS_COMPUTER,
  MULTIPLAYER,
} from '../../constants/game';

const propTypes = {
  type: PropTypes.oneOf([
    HOTSEAT,
    PLAYER_VS_COMPUTER,
    MULTIPLAYER,
  ]),
};

const defaultProps = {
  type: HOTSEAT,
};

const NoopComponent = () => (
  <div />
);

const containers = {
  HOTSEAT: ConfigureHotseat,
  PLAYER_VS_COMPUTER: NoopComponent,
  MULTIPLAYER: NoopComponent,
};

const ConfigureRoute = props => {
  const ConfigureContainer = containers[props.type];

  return (
    <RouteStyled>
      <ConfigureRouteStyled>
        <ConfigureContainer />
      </ConfigureRouteStyled>
    </RouteStyled>
  );
};

ConfigureRoute.propTypes = propTypes;
ConfigureRoute.defaultProps = defaultProps;
ConfigureRoute.displayName = 'ConfigureRoute';

const mapStateToProps = ({ game }) => ({
  type: game.type,
});

export default connect(mapStateToProps)(ConfigureRoute);
