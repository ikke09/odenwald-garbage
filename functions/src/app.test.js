const supertest = require('supertest');
const app = require('./app');
const cityDistricts = require('./constants/city-districts');

describe('App', () => {
    describe('Index Route', () => {
        const currentVersionString = '1.0.0.0';
        it('/ should return the current version', async () => {
            const response = await supertest(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body.version).toBe(currentVersionString);
        });
        it('/api should return the current version', async () => {
            const response = await supertest(app)
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.version).toBe(currentVersionString);
        });
    });

    describe('Garbages Route', () => {
        const baseRoute = '/api/garbages';
        it(`${baseRoute} without query should throw an error`, async () => {
            return await supertest(app)
                .get(baseRoute)
                .set('Accept', 'application/json')
                .expect(404);
        });

        it(`${baseRoute} with city only route should throw an error`, async () => {
            return await supertest(app)
                .get(`${baseRoute}/Michelstadt`)
                .set('Accept', 'application/json')
                .expect(404);
        });

        it(`${baseRoute} with city & district route should load all data for one year`, async () => {
            const response = await supertest(app)
                .get(`${baseRoute}/Michelstadt/Kernstadt`)
                .set('Accept', 'application/json')
                .expect(200);
            const body = response.body;
            expect(body.length).toBeGreaterThan(0);
            expect(body.every((d) => new Date(d.date).getFullYear() === new Date().getFullYear())).toBeTruthy();
        });
    });

    describe('City-District Route', () => {
        const baseRoute = '/api/citydistricts';
        it(`${baseRoute} should return all cities with their districts`, async () => {
            const response = await supertest(app)
                .get(baseRoute)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body).toStrictEqual(cityDistricts);
        });
        it(`${baseRoute}/Michelstadt should return all districts for Michelstadt`, async () => {
            const response = await supertest(app)
                .get(`${baseRoute}/Michelstadt`)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body).toStrictEqual(cityDistricts['Michelstadt']);
        });
    });
});
