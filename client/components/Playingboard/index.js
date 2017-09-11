/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import Row from '../Row';
import PlayingboardStyled from './styled/PlayingboardStyled';

import {
  PlayingboardPropTypes,
  PlayingboardDefaultProps,
} from '../../models/playingboard';

import { noop } from '../../../utils/misc';

const propTypes = {
  playingboard: PlayingboardPropTypes,
  onChangeCellMode: PropTypes.func,
};

const defaultProps = {
  playingboard: PlayingboardDefaultProps,
  onChangeCellMode: noop,
};

class Playingboard extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.playingboard !== this.props.playingboard)
      return true;

    return false;
  }

  _handleChangeModeCell = (rowNum, cellNum) => {
    this.props.onChangeCellMode(rowNum, cellNum);
  }

  _renderRows() {
    const { playingboard } = this.props;

    return Array.from({ length: playingboard.size }, (value, rowNum) => {
      const cells = Array.from(
        { length: playingboard.size },
        (value, cellNum) => (
          <Cell
            key={cellNum}
            column={cellNum}
            row={rowNum}
            mode={playingboard.getIn([rowNum, cellNum])}
            onClick={this._handleChangeModeCell}
          />
        ),
      );

      return (
        <Row key={rowNum}>
          {cells}
        </Row>
      );
    });
  }

  render() {
    const rows = this._renderRows();

    return (
      <PlayingboardStyled>
        {rows}
      </PlayingboardStyled>
    );
  }
}

Playingboard.propTypes = propTypes;
Playingboard.defaultProps = defaultProps;
Playingboard.displayName = 'Playingboard';

export default Playingboard;
