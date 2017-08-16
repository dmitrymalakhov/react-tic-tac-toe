/**
 * @author Dmitry Malakhov
 */

'use strict';

module.exports.noop = () => {};
module.exports.isUndef = maybeUndef => typeof maybeUndef === 'undefined';
module.exports.fastParseNumberFromString = string => string | 0;

module.exports.isNumeric = maybeNumeric =>
  !isNaN(parseFloat(maybeNumeric)) && isFinite(maybeNumeric);
