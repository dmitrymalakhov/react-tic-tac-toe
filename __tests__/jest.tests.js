/**
 * @author Dmitry Malakhov
 */

'use strict';

/* eslint-env jest */
/* eslint-disable no-console */
import '../jestSetup';

test('should throw when console.error', () => {
  expect(console.error).toThrow();
});

test('should throw when console.warn', () => {
  expect(console.warn).toThrow();
});
