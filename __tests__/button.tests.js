/**
 * @author Dmitry Malakhov
 */

'use strict';

/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../app/components/Button';

jest.mock('react-dom');

describe('<Button/>', () => {
  test('call onClick if handles click', () => {
    const mockFn = jest.fn();

    const tree = renderer.create(
      <Button onClick={mockFn} />
    ).toJSON();

    tree.props.onClick();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
