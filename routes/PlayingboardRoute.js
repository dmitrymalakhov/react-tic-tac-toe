/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { Button } from '../components/Button';
import RouteContainer from '../containers/RouteContainer';

import PlayingboardRouteContainer from
  '../containers/PlayingboardRouteContainer';

import { noop } from '../utils/misc';

const propTypes = {
  onRedirectToPath: PropTypes.func,
};

const defaultProps = {
  onRedirectToPath: noop,
};

class PlayingboardRoute extends Component {
  _handleRedirectToConfigure = () => {
    this.props.onRedirectToPath('/configure');
  }

  render() {
    return (
      <RouteContainer>
        <PlayingboardRouteContainer>
          PlayingboardRoute
          <Button onClick={this._handleRedirectToConfigure} />
        </PlayingboardRouteContainer>
      </RouteContainer>
    );
  }
}

PlayingboardRoute.propTypes = propTypes;
PlayingboardRoute.defaultProps = defaultProps;
PlayingboardRoute.displayName = 'PlayingboardRoute';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingboardRoute);
