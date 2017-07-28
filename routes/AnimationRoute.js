import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConfigureRoute from './ConfigureRoute';
import PlayingboardRoute from './PlayingboardRoute';
import SCTransition from '../components/SCTransition';

const propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const defaultProps = {
  location: {},
}

class AnimationRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      prevRouteAnimationEnded: false,
      currentPathname: props.location.pathname,
    };
  }

  _getRouteByPathname(pathname) {
    switch (pathname) {
      case '/configure':
        return <ConfigureRoute />;
      case '/playingboard':
        return <PlayingboardRoute />;
      default:
        return null;
    }
  }

  _renderPrevRoute() {
    if (this.state.prevRouteAnimationEnded)
      return null;

    return this._getRouteByPathname(this.props.prevPathname);
  }

  _renderNextRoute() {
    return this._getRouteByPathname(this.props.location.pathname);
  }

  _handleTransitionOut = () => {
    this.setState({
      prevRouteAnimationEnded: true,
    })
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
