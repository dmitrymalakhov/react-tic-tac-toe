/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import CellStyled from './styled/CellStyled';

export const Cell = props => (
  <CellStyled>
    {props.children}
  </CellStyled>
);
