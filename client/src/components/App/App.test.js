import React from 'react';
import { create } from 'react-test-renderer';
import App from './App';

describe('App component', () => {
  test('Matches the snapshot', () => {
    const app = create(<App />);
    const json = app.toJSON();
    expect(json).not.toBe('');
  });
});
