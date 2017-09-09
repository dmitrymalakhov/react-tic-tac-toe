/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { INIT_ROUTE } from '../constants/route';
import { noop } from '../../utils/misc';

const propTypes = {
  onRedirectToPath: PropTypes.func,
};

const defaultProps = {
  onRedirectToPath: noop,
};

class RedirectToInitRoute extends PureComponent {
  componentWillMount() {
    this.props.onRedirectToPath(INIT_ROUTE);
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

RedirectToInitRoute.propTypes = propTypes;
RedirectToInitRoute.defaultProps = defaultProps;
RedirectToInitRoute.displayName = 'RedirectRoute';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedirectToInitRoute);
