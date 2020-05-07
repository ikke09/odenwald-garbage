const request = require('supertest');
const app = require('../app');

describe('Garbages Route', () => {
  it('/api/garbages without query should throw an error', () => {
    return request(app)
      .get('/api/garbages')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('/api/garbages/ with only city route should throw an error', () => {
    return request(app)
      .get('/api/garbages/Michelstadt')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('/api/garbages/ with city & district route should load all data for one year', () => {
    return request(app)
      .get('/api/garbages/Michelstadt/Kernstadt')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((d) => new Date(d.date).getFullYear() === new Date().getFullYear())).toBeTruthy();
      });
  });
});
