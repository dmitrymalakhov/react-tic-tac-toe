/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SCTransitionStyled } from './styled/SCTransitionStyled';
import { noop } from '../../../utils/misc';

const propTypes = {
  transitionIn: PropTypes.bool,
  transitionOut: PropTypes.bool,
  onTransitionIn: PropTypes.func,
  onTransitionOut: PropTypes.func,
};

const defaultProps = {
  transitionIn: false,
  transitionOut: false,
  onTransitionIn: noop,
  onTransitionOut: noop,
};

export default class SCTransition extends PureComponent {
  constructor(props) {
    super(props);

    this._domNode = null;
  }

  componentDidMount() {
    this._domNode.addEventListener('transitionend', this._handleTransitionEnd);
    this._domNode.addEventListener('animationend', this._handleTransitionEnd);
  }

  componentWillUnmount() {
    this._domNode.removeEventListener(
      'transitionend',
      this._handleTransitionEnd,
    );

    this._domNode.removeEventListener(
      'animationend',
      this._handleTransitionEnd,
    );
  }

  _handleTransitionEnd = () => {
    const { transitionIn, transitionOut } = this.props;

    if (transitionIn)
      this.props.onTransitionIn();

    if (transitionOut)
      this.props.onTransitionOut();
  }

  _saveRef = ref => {
    this._domNode = ref;
  }

  render() {
    const { transitionIn, transitionOut, children } = this.props;

    return (
      <SCTransitionStyled
        innerRef={this._saveRef}
        transitionIn={transitionIn}
        transitionOut={transitionOut}
      >
        {children}
      </SCTransitionStyled>
    );
  }
}

SCTransition.propTypes = propTypes;
SCTransition.defaultProps = defaultProps;
SCTransition.displayName = 'SCTransition';
