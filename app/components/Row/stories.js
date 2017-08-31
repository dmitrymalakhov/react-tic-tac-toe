/**
* @author Dmitry Malakhov
*/

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Row from './';
import Cell from '../Cell';

const onClickAction = action('onClick');

storiesOf('Row', module)
  .add('default props', () => <Row onClick={onClickAction} />)
  .add('with Cells', () => (
    <Row>
      <Cell />
      <Cell />
      <Cell />
    </Row>
  ));
