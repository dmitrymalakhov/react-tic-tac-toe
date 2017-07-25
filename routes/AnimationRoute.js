import React, { PureComponent } from 'react';
import RootRoute from './RootRoute';
import SCTransition from '../components/SCTransition';

class AnimationRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      transitionIn: false,
      transitionOut: true,
    };
  }

  onClickIn = () => {
    this.setState({
      animate: true,
    });
  }

  render() {
    const { transitionIn, transitionOut, animate } = this.state;

    return (
      <div>
        <SCTransition
          transitionIn={transitionIn}
          transitionOut={transitionOut}
          animate={animate}
        >
          <RootRoute />
        </SCTransition>
      </div>
    );
  }
}

AnimationRoute.displayName = 'AnimationRoute';

export default AnimationRoute;
