/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AnimationRoute from './AnimationRoute';
import RedirectToConfigureRoute from './RedirectToConfigureRoute';
import { ROOT_ROUTE } from '../constants/route';

const propTypes = {
  routeName: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const defaultProps = {
  routeName: ROOT_ROUTE,
  location: {},
};

class ShallowRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectToRefferer: false,
    };

    this._prevPathname = null;
    this._currenPathname = props.location.pathname;
  }

  componentWillReceiveProps(nextProps) {
    if (this._currenPathname !== nextProps.location.pathname) {
      this._prevPathname = this._currenPathname;
      this._currenPathname = nextProps.location.pathname;
    }

    this.setState({
      redirectToRefferer: this.props.routeName !== nextProps.routeName,
    });
  }

  render() {
    const redirect = this.state.redirectToRefferer
      ? <Redirect to={this.props.routeName} />
      : null;

    return (
      <div>
        <Route exact path="/" component={RedirectToConfigureRoute} />
        <Route
          location={this.props.location}
          key={this.props.location.key}
          path="/:pathname"
          render={props => (
            <AnimationRoute
              {...props}
              prevPathname={this._prevPathname}
            />
          )}
        />
        {redirect}
      </div>
    );
  }
}

ShallowRoute.propTypes = propTypes;
ShallowRoute.defaultProps = defaultProps;
ShallowRoute.displayName = 'ShallowRoute';

const mapStateToProps = ({ app }) => ({
  routeName: app.routeName,
});

export default connect(mapStateToProps)(ShallowRoute);
