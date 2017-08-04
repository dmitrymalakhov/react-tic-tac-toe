/**
 * @author Dmitry Malakhov
 */

'use strict';

export const noop = () => {};

export const isNumeric = maybeNumeric =>
  !isNaN(parseFloat(maybeNumeric)) && isFinite(maybeNumeric);

export const fastParseNumberFromString = string => string | 0;
