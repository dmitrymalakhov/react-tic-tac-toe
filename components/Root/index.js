/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { injectGlobalStyle } from '../../styles/globalStyles';
import ShallowRoute from '../../routes/ShallowRoute';

const propTypes = {
  routeName: PropTypes.string,
};

const defaultProps = {
  routeName: '/',
};

injectGlobalStyle();

const HeaderTitle = styled.div`
  text-align: center;
`;

class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectToRefferer: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      redirectToRefferer: this.props.routeName !== nextProps.routeName,
    });
  }

  render() {
    const redirectOptions = {
      pathname: this.props.routeName,
    };

    const redirect = this.state.redirectToRefferer
      ? <Redirect push to={redirectOptions} />
      : null;

    return (
      <BrowserRouter>
        <div>
          <HeaderTitle>
            Noughts and Daggers Game
          </HeaderTitle>
          <Route render={ShallowRoute} />
          {redirect}
        </div>
      </BrowserRouter>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;
Root.displayName = 'Root';

const mapStateToProps = ({ app }) => ({
  routeName: app.routeName,
});



export default connect(mapStateToProps)(Root);
