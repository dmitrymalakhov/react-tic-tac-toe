/**
* @author Dmitry Malakhov
*/

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Cell from './';

const onClickAction = action('onClick');

storiesOf('Cell', module)
  .add('default props', () => <Cell onClick={onClickAction} />)
  .add('with position', () => (
    <Cell row={1} column={1} onClick={onClickAction} />
  ))
  .add('with mode 1', () => <Cell mode={1} onClick={onClickAction} />)
  .add('with mode -1', () => <Cell mode={-1} onClick={onClickAction} />);
