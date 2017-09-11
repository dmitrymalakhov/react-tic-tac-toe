/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import RowStyled from './styled/RowStyled';

const Row = props => (
  <RowStyled>
    {props.children}
  </RowStyled>
);

export default Row;
