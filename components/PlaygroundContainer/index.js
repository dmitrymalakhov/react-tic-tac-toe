/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import { PlaygroundContainerStyled } from './styled/PlaygroundContainerStyled';

export const PlaygroundContainer = props => (
  <PlaygroundContainerStyled>
    {props.children}
  </PlaygroundContainerStyled>
)
