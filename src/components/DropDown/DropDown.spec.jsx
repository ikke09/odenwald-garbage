import React from 'react';
import { create } from 'react-test-renderer';
import DropDown from './DropDown';

describe('DropDown component', () => {
  test('should be created', () => {
    const dropdown = create(<DropDown name="Test" value="B" default="A" options={['A', 'B']} onChange={() => {}} />);
    const json = dropdown.toJSON();
    expect(json).not.toBe('');
  });
});
