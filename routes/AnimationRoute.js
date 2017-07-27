import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ConfigureRoute from './ConfigureRoute';
import PlayingboardRoute from './PlayingboardRoute';
import SCTransition from '../components/SCTransition';

class AnimationRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      transitionIn: false,
      transitionOut: false,
      prevPathname: '',
      nextPathname: props.location.pathname,
    };

    this._neededAnimateAfterRender = false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname !== nextProps.routeName &&
      !this._neededAnimateAfterRender
    ) {
      this.setState((prevState, props) => ({
        prevPathname: nextProps.location.pathname,
        nextPathname: nextProps.routeName,
        animate: false,
      }));

      this._neededAnimateAfterRender = true;
    }
  }

  componentDidUpdate() {
    if (this._neededAnimateAfterRender)
      this._dangerouslyUpdateAnimationState();
  }

  _dangerouslyUpdateAnimationState() {
    this.setState({
      animate: true,
    });
  }

  _getRouteByPathname(pathname) {
    switch (pathname) {
      case '/configure':
        return ConfigureRoute;
      case '/playingboard':
        return PlayingboardRoute;
      default:
        return ConfigureRoute;
    }
  }

  _getPrevRoute() {
    return this._getRouteByPathname(this.state.prevPathname);
  }

  _getNextRoute() {
    return this._getRouteByPathname(this.state.nextPathname);
  }

  _handleLeaveAnimateRoute = () => {
    this.setState({
      transitionOut: false,
      transitionIn: true,
      animate: false,
    });
  }

  _handleEnterAnimateRoute = () => {
    this.setState({
      animate: false,
    });

    this._neededAnimateAfterRender = false;
  }

  render() {
    const { animate } = this.state;

    const PrevRoute = this._getPrevRoute(),
      NextRoute = this._getNextRoute();

    return (
      <div>
        <SCTransition transitionOut animate={animate}>
          <PrevRoute />
        </SCTransition>
        <SCTransition transitionIn animate={animate}>
          <NextRoute />
        </SCTransition>
      </div>
    );
  }
}

AnimationRoute.displayName = 'AnimationRoute';

const mapStateToProps = ({ app }) => ({
  routeName: app.routeName,
});

export default connect(mapStateToProps)(AnimationRoute);
