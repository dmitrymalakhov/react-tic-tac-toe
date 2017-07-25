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

class RedirectRoute extends PureComponent {
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

RedirectRoute.propTypes = propTypes;
RedirectRoute.defaultProps = defaultProps;
RedirectRoute.displayName = 'RedirectRoute';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RedirectRoute);
