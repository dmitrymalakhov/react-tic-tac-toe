/**
 * @author Dmitry Malakhov
 */

'use strict';

/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from '../app/components/Button';

jest.mock('react-dom');

test('Button renders correctly', () => {
  const mockFn = jest.fn();

  const tree = renderer.create(
    <Button onClick={mockFn} />
  ).toJSON();

  tree.props.onClick();

  expect(mockFn).toHaveBeenCalledTimes(1);
});
