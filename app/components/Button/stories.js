/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './';

const onClickAction = action('onClick');

storiesOf('Button', module)
  .add('default props', () => <Button onClick={onClickAction} />)
  .add('with label', () => (
    <Button label="Button" onClick={onClickAction} />
  ));
