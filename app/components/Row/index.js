/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import RowStyled from './styled/RowStyled';

export const Row = props => (
  <RowStyled>
    {props.children}
  </RowStyled>
);
