/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './styled/ButtonStyled';
import { noop } from '../../../utils/misc';

const propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: '',
  onClick: noop,
};

const Button = props => (
  <ButtonStyled onClick={props.onClick}>
    {props.label}
  </ButtonStyled>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.displayName = 'Button';

export default Button;
