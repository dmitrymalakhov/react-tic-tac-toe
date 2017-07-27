/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import { injectGlobalStyle } from '../../styles/globalStyles';
import ShallowRoute from '../../routes/ShallowRoute';

injectGlobalStyle();

const HeaderTitle = styled.div`
  text-align: center;
`;

const Root = () => (
  <BrowserRouter>
    <div>
      <HeaderTitle>
        Noughts and Daggers Game
      </HeaderTitle>
      <Route component={ShallowRoute} />
    </div>
  </BrowserRouter>
);

Root.displayName = 'Root';

export default Root;
