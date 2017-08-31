/**
 * @author Dmitry Malakhov
 */

'use strict';

/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Cell from '../app/components/Cell';

test('if click on Cell return position', () => {
  const mockFn = jest.fn();

  const tree = renderer.create(
    <Cell row={2} column={3} onClick={mockFn} />
  ).toJSON();

  tree.props.onClick();

  expect(mockFn).toHaveBeenCalledWith(2, 3);
});
