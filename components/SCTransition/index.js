import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SCTransitionStyled } from './styled/SCTransitionStyled';
import { noop } from '../../utils/misc';

const propTypes = {
  transitionIn: PropTypes.bool,
  transitionOut: PropTypes.bool,
  animate: PropTypes.bool,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
};

const defaultProps = {
  transitionIn: false,
  transitionOut: false,
  animate: false,
  onEnter: noop,
  onLeave: noop,
};

export default class SCTransition extends PureComponent {
  constructor(props) {
    super(props);

    this._domNode = null;
  }

  componentDidMount() {
    this._domNode.addEventListener('transitionend', this._handleTransitionEnd);
  }

  componentWillUnmount() {
    this._domNode.removeEventListener(
      'transitionend',
      this._handleTransitionEnd,
    );
  }

  _handleTransitionEnd = () => {
    const { transitionIn, transitionOut } = this.props;

    if (transitionIn)
      this.props.onEnter();

    if (transitionOut)
      this.props.onLeave();
  }

  _saveRef = ref => {
    this._domNode = ref;
  }

  render() {
    const { transitionIn, transitionOut, animate, children } = this.props;

    return (
      <SCTransitionStyled
        innerRef={this._saveRef}
        transitionIn={transitionIn}
        transitionOut={transitionOut}
        animate={animate}
      >
        {children}
      </SCTransitionStyled>
    );
  }
}

SCTransition.propTypes = propTypes;
SCTransition.defaultProps = defaultProps;
SCTransition.displayName = 'SCTransition';
