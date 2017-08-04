/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

import {
  padding,
  borderColor,
  borderStyle,
} from 'polished';

export const ButtonStyled = styled.div`
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  margin: 0;
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  text-transform: uppercase;
  ${padding('15px', '15px', '15px', '15px')}
  ${borderStyle('solid')}
  ${borderColor('black')}

  &:hover {
    ${borderStyle('dotted')}
  }
`;
