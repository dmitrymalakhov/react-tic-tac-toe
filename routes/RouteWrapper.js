/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import styled from 'styled-components';
import { injectGlobalStyle } from '../styles/globalStyles';

injectGlobalStyle();

const HeaderTitle = styled.div`
  text-align: center;
`;

const RouteWrapper = props => (
  <div>
    <HeaderTitle>Noughts and Daggers Game</HeaderTitle>
    {props.children}
  </div>
);

export default RouteWrapper;
