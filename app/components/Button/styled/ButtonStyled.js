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

export const ButtonStyled = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  width: 200px;
  cursor: pointer;
  margin: 0;
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  ${padding('15px', '15px', '15px', '15px')}
  ${borderStyle('solid')}
  ${borderColor('black')}

  &:disabled {
    ${borderColor('gray')}
    ${borderStyle('solid')}
  }

  &:hover {
    ${borderStyle('dotted')}
  }
`;
