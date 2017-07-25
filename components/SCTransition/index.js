import React from 'react';
import { SCTransitionStyled } from './styled/SCTransitionStyled';

const SCTransition = props => (
  <SCTransitionStyled {...props} />
);

SCTransition.displayName = 'SCTransition';

export default SCTransition;
