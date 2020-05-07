const request = require('supertest');
const app = require('../app');

describe('Index Route', () => {
  it('/ should return the current version', (done) => {
    return request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.version).toBe('1.0.0.0');
        done();
      });
  });
  it('/api should return the current version', (done) => {
    return request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.version).toBe('1.0.0.0');
        done();
      });
  });
});
