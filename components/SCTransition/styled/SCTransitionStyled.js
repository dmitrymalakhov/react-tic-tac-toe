/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const opacity = ({ transitionIn, transitionOut, animate }) => {
  let opacity = 1;

  if (transitionIn)
    opacity = animate ? 1 : 0;
  else if (transitionOut)
    opacity = animate ? 0 : 1;

  return `
    opacity: ${opacity};
  `;
};

export const SCTransitionStyled = styled.div`
  transition: opacity 0.3s ease-out 0.3s;
  ${opacity}
`;
