/* eslint-env jest */
/* eslint-disable no-console */

const throwError = jest.fn(
  mes => {
    throw new Error(mes);
  },
);

console.error = throwError;
console.warn = throwError;
