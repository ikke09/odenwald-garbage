import React from 'react';
import { create } from 'react-test-renderer';
import Garbage from './Garbage';

describe('Garbage component', () => {
  test('should be created', () => {
    const garbage = create(<Garbage />);
    const json = garbage.toJSON();
    expect(json).not.toBe('');
  });
});
