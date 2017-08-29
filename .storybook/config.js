/**
 * @author Dmitry Malakhov
 */

'use strict';

import { addDecorator, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const req = require.context('../app/components', true, /stories\.js$/);
const loadStories = () => req.keys().forEach(filename => req(filename));

addDecorator((story, context) => withInfo('common info')(story)(context));
configure(loadStories, module);
