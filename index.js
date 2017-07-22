/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import RouteWrapper from './routes/RouteWrapper';
import RootRoute from './routes/RootRoute';
import store from './store';

const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <RouteWrapper>
          <Route exact path="/" component={RootRoute} />
        </RouteWrapper>
      </BrowserRouter>
    </Provider>
  , container);
});
