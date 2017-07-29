/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { noop } from '../utils/misc';

const propTypes = {
  onRedirectToPath: PropTypes.func,
};

const defaultProps = {
  onRedirectToPath: noop,
};

class RedirectToConfigureRoute extends PureComponent {
  componentWillMount() {
    this.props.onRedirectToPath('/configure');
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

RedirectToConfigureRoute.propTypes = propTypes;
RedirectToConfigureRoute.defaultProps = defaultProps;
RedirectToConfigureRoute.displayName = 'RedirectRoute';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedirectToConfigureRoute);
