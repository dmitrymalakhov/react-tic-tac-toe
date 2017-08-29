/**
* @author Dmitry Malakhov
*/

'use strict';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GameInfoBox from './';

const onClickAction = action('onClick');

storiesOf('GameInfoBox', module)
  .add('default props', () => <GameInfoBox onClick={onClickAction} />);
