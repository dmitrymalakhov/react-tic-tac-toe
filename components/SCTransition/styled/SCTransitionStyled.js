/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const opacity = ({ transitionIn, run }) => {
  let opacity = 0;

  if (transitionIn && run) {
    opacity = 1;
  } else {
    if (run)
      opacity = 0;
    else
      opacity = 1;
  }

  return `
    opacity: ${opacity};
  `;
};

export const SCTransitionStyled = () => styled.div`
  ${opacity}
  transition: all .75s ease;
`;
