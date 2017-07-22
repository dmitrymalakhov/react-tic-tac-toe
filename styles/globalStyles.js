'use strict';

import { injectGlobal } from 'styled-components';

export const injectGlobalStyle = () => {
  // eslint-disable-next-line no-unused-expressions
  injectGlobal`
    body {
      font-family: Roboto, sans-serif;
    }
  `;
};
