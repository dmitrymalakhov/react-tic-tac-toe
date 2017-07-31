/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectToPath } from '../actions/app';
import { Button } from '../components/Button';
import { Cell } from '../components/Cell';
import { Row } from '../components/Row';
import RouteContainer from '../containers/RouteContainer';

import PlayingboardRouteContainer from
  '../containers/PlayingboardRouteContainer';

import { noop } from '../utils/misc';

const propTypes = {
  size: PropTypes.number,
  onRedirectToPath: PropTypes.func,
};

const defaultProps = {
  onRedirectToPath: noop,
};

class PlayingboardRoute extends Component {
  _handleRedirectToConfigure = () => {
    this.props.onRedirectToPath('/configure');
  }

  _renderRows() {
    return Array.from({ length: this.props.size }, (value, rowNum) => {
      const cells = Array.from({ length: this.props.size },
        (value, cellNum) => <Cell num={cellNum} row={rowNum} />
      );

      return (
        <Row>
          {cells}
        </Row>
      );
    });
  }

  render() {
    const rows = this._renderRows();

    return (
      <RouteContainer>
        <PlayingboardRouteContainer>
          { rows }
          <Button
            label="Back to configure"
            onClick={this._handleRedirectToConfigure}
          />
        </PlayingboardRouteContainer>
      </RouteContainer>
    );
  }
}

PlayingboardRoute.propTypes = propTypes;
PlayingboardRoute.defaultProps = defaultProps;
PlayingboardRoute.displayName = 'PlayingboardRoute';

const mapStateToProps = ({ game }) => ({
  size: game.size,
});

const mapDispatchToProps = dispatch => ({
  onRedirectToPath: routeName => void dispatch(redirectToPath(routeName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingboardRoute);
