import React from 'react';
import { create } from 'react-test-renderer';
import App from './App';

describe('App component', () => {
  test('should be created', () => {
    const app = create(<App />);
    const json = app.toJSON();
    expect(json).not.toBe('');
  });
});
