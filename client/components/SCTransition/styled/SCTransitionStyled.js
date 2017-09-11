/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const animation = ({ transitionOut }) => {
  const animationType = transitionOut
    ? fadeOut
    : fadeIn;

  return `
    animation: ${animationType} 1s ease-in-out;
  `;
};

export const SCTransitionStyled = styled.div`
  ${animation}
`;
