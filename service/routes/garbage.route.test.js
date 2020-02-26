const request = require('supertest');
const app = require('../app');

describe('Garbage Route', () => {
  it('/api/garbage without query should throw an error', () => {
    return request(app)
      .get('/api/garbage')
      .set('Accept', 'application/json')
      .expect(500);
  });
});
