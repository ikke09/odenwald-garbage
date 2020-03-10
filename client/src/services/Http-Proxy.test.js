import { createUrl } from './Http-Proxy';

describe('Http-Proxy', () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, REACT_APP_APIDOMAIN: 'localhost:5000' };
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should create url correctly without params', () => {
    expect(createUrl('test')).toBe('http://localhost:5000/api/test');
    expect(createUrl('test/1')).toBe('http://localhost:5000/api/test/1');
  });

  it('should create url correctly with params', () => {
    expect(createUrl('test', { id: 1 })).toBe('http://localhost:5000/api/test?id=1');
    expect(createUrl('test', { id: '1' })).toBe('http://localhost:5000/api/test?id=1');
    expect(createUrl('test', { id: true })).toBe('http://localhost:5000/api/test?id=true');
    expect(createUrl('test/param', { id: 1 })).toBe('http://localhost:5000/api/test/param?id=1');
    expect(createUrl('test', { id: 1, search: 'query', active: true })).toBe(
      'http://localhost:5000/api/test?id=1&search=query&active=true'
    );
  });
});
