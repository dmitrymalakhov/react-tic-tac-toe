/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { Button } from '../components/Button';

class PlayingboardRoute extends Component {
  _handleRedirectToConfigure = () => {
    this.props.onRedirectToPath('/configure');
  }

  render() {
    return (
      <div>
        PlayingboardRoute
        <Button onClick={this._handleRedirectToConfigure} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingboardRoute);
