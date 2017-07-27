import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RootRoute from './RootRoute';
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
        transitionOut: true,
        transitionIn: false,
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
        return RootRoute;
      case '/playingboard':
        return PlayingboardRoute;
      default:
        return RootRoute;
    }
  }

  _getPrevRoute() {
    return this._getRouteByPathname(this.state.prevPathname);
  }

  _getNextRoute() {
    return this._getRouteByPathname(this.state.nextPathname);
  }

  _renderTransitionRoute() {
    const { transitionOut } = this.state;

    const PrevRoute = this._getPrevRoute(),
      NextRoute = this._getNextRoute();

    if (transitionOut)
      return <PrevRoute />;

    return <NextRoute />;
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
    const { transitionIn, transitionOut, animate } = this.state;

    const transitionRoute = this._renderTransitionRoute();

    return (
      <div>
        <SCTransition
          transitionIn={transitionIn}
          transitionOut={transitionOut}
          animate={animate}
          onLeave={this._handleLeaveAnimateRoute}
          onEnter={this._handleEnterAnimateRoute}
        >
          {transitionRoute}
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
