/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LabelStyled } from './styled/LabelStyled';
import { InputStyled } from './styled/InputStyled';
import { noop } from '../../../utils/misc';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

const defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  onChange: noop,
};

let nextInputId = 0;

export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this._inputID = `input-${nextInputId++}`;
  }

  _handleChange = event => {
    if (!event) return;
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <LabelStyled htmlFor={this._inputId}>
        {this.props.label}
        <InputStyled
          id={this._inputID}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this._handleChange}
        />
      </LabelStyled>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
Input.displayName = 'Input';
