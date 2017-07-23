/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import { RootContainerStyled } from './styled/RootContainerStyled';

export const RootContainer = props => (
  <RootContainerStyled>
    {props.children}
  </RootContainerStyled>
);
