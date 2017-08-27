/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConfigureRoute from './ConfigureRoute';
import PlayingboardRoute from './PlayingboardRoute';
import FinishRoute from './FinishRoute';
import SCTransition from '../components/SCTransition';
import asyncComponent from '../hoc/asyncComponent';

import {
  ROOT_ROUTE,
  CONFIGURE_ROUTE,
  PLAYINGBOARD_ROUTE,
  FINISH_ROUTE,
  ABOUT_ROUTE,
} from '../constants/route';

const propTypes = {
  prevPathname: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const defaultProps = {
  prevPathname: ROOT_ROUTE,
  location: {},
};

const AboutRoute = () => import(
  /* webpackChunkName: 'about' */
  './AboutRoute'
);

const availableRoutes = {
  [CONFIGURE_ROUTE]: ConfigureRoute,
  [PLAYINGBOARD_ROUTE]: PlayingboardRoute,
  [FINISH_ROUTE]: FinishRoute,
  [ABOUT_ROUTE]: asyncComponent(AboutRoute),
};

const routeElements = new Proxy(availableRoutes, {
  get(target, prop) {
    const Route = target[prop];
    return Route ? <Route /> : null;
  },
});

class AnimationRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      prevRouteAnimationEnded: false,
      currentPathname: props.location.pathname,
    };
  }

  _renderPrevRoute() {
    if (this.state.prevRouteAnimationEnded)
      return null;

    return routeElements[this.props.prevPathname];
  }

  _renderNextRoute() {
    return routeElements[this.props.location.pathname];
  }

  _handleTransitionOut = () => {
    this.setState({
      prevRouteAnimationEnded: true,
    });
  }

  render() {
    const PrevRoute = this._renderPrevRoute(),
      NextRoute = this._renderNextRoute();

    return (
      <div>
        <SCTransition transitionOut onTransitionOut={this._handleTransitionOut}>
          {PrevRoute}
        </SCTransition>
        <SCTransition transitionIn>
          {NextRoute}
        </SCTransition>
      </div>
    );
  }
}

AnimationRoute.propTypes = propTypes;
AnimationRoute.defaultProps = defaultProps;
AnimationRoute.displayName = 'AnimationRoute';

export default AnimationRoute;
