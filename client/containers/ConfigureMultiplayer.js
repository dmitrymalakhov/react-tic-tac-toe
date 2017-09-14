/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from "./net_interface";

class ConfigureMultiplayer extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>

      </ApolloProvider>,
    )
  }
}
