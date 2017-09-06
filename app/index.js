/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './root';
import store from './store';

const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    container
  );
});
