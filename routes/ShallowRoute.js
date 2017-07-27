import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AnimationRoute from './AnimationRoute';
import RedirectRoute from './RedirectRoute';

const propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const defaultProps = {
  location: {},
};

const ShallowRoute = ({ location }) => (
  <div>
    <Route exact path="/" component={RedirectRoute} />
    <Route
      location={location}
      key={location.key}
      path="/:pathname"
      component={AnimationRoute}
    />
  </div>
);

ShallowRoute.propTypes = propTypes;
ShallowRoute.defaultProps = defaultProps;
ShallowRoute.displayName = 'ShallowRoute';

export default ShallowRoute;
