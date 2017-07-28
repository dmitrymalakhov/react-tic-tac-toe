/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const animation = ({ transitionOut }) => {
  const animationType = transitionOut
    ? 'transitionOut'
    : 'transitionIn';

  return `
    animation: ${animationType} 2s ease-in-out;
  `;
};

export const SCTransitionStyled = styled.div`
  ${animation}

  @keyframes transitionIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes transitionOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
