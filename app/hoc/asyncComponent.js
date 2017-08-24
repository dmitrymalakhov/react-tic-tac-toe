/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';

const asyncComponent = getComponent => {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;

      if (Component)
        return <Component {...this.props} />;

      return null;
    }
  }

  return AsyncComponent;
};

export default asyncComponent;
