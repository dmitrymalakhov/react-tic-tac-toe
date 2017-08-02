/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import CellStyled from './styled/CellStyled';

export class Cell extends PureComponent {
  _handleClick = () => {
    const { num, rowNum } = this.props;
    this.props.onClick(num, rowNum);
  }

  _renderSymbol() {
    const { mode } = this.props;

    if (mode === 1)
      return 'o';

    if (mode === -1)
      return 'x';
  }

  render() {
    return (
      <CellStyled onClick={this._handleClick}>
        {this.props.children}
      </CellStyled>
    );
  }
}
