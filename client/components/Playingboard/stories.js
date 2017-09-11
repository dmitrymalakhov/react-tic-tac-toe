/**
* @author Dmitry Malakhov
*/

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Playingboard from './';

const onClickAction = action('onClick');

storiesOf('Playingboard', module)
  .add('default props', () => <Playingboard onClick={onClickAction} />);
