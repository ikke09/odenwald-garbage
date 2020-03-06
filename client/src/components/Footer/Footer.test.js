import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';

describe('Footer component', () => {
  test('should be able to render', () => {
    const footer = create(<Footer />);
    const json = footer.toJSON();
    expect(json).not.toBe('');
  });
});
