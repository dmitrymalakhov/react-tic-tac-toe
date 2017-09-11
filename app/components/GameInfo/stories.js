/**
* @author Dmitry Malakhov
*/

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GameInfo from './';

const onClickAction = action('onClick');

storiesOf('GameInfo', module)
  .add('default props', () => <GameInfo onClick={onClickAction} />);
