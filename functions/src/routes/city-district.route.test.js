const request = require('supertest');
const app = require('../app');
const cityDistricts = require('../constants/city-districts');

describe('City-District Route', () => {
  it('/api/citydistricts should return all cities with their districts', (done) => {
    return request(app)
      .get('/api/citydistricts')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toStrictEqual(cityDistricts);
        done();
      });
  });
  it('/api/citydistricts/Michelstadt should return all districts for Michelstadt', (done) => {
    return request(app)
      .get('/api/citydistricts/Michelstadt')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toStrictEqual(cityDistricts['Michelstadt']);
        done();
      });
  });
});
