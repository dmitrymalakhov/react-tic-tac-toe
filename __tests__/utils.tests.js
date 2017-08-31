/**
 * @author Dmitry Malakhov
 */

'use strict';

/* eslint-env jest */
import {
  noop,
  isUndef,
  fastParseNumberFromString,
  isNumeric,
} from '../utils/misc';

jest.mock('react-dom');

describe('utils misc', () => {
  test('noop always return undefined', () => {
    expect(noop()).toBeUndefined();
  });

  test('noop is function', () => {
    expect(noop).toBeInstanceOf(Function);
  });

  test('isUndef(undefined) is true', () => {
    expect(isUndef(undefined)).toBeTruthy();
  });

  test('isUndef(false) is false', () => {
    expect(isUndef(false)).toBeFalsy();
  });

  test('fastParseNumberFromString("3") is 3', () => {
    expect(fastParseNumberFromString('3')).toBe(3);
  });

  test('isNumeric(3) is true', () => {
    expect(isNumeric(3)).toBeTruthy();
  });

  test('isNumeric("3") is true', () => {
    expect(isNumeric('3')).toBeTruthy();
  });

  test('isNumeric("NotNumber") is false', () => {
    expect(isNumeric('NotNumber')).toBeFalsy();
  });
});
