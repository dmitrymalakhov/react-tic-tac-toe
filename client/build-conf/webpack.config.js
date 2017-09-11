/**
 * @author Dmitry Malakhov
 */

'use strict';

const development = require('./development.config'),
  production = require('./production.config');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = NODE_ENV === 'development'
  ? development
  : production;
