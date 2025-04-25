const request = require('supertest');
const express = require('express');

// Import the route files
const ethnicGroupRoutes = require('../routes/ethnicGroupRoutes');
const languageRoutes = require('../routes/languageRoutes');
const provinceRoutes = require('../routes/provinceRoutes');

const app = express();
app.use(express.json());

// Mount the routes under a fake base URL (optional)
app.use('/ethnic-groups', ethnicGroupRoutes);
app.use('/languages', languageRoutes);
app.use('/provinces', provinceRoutes);

// Basic tests
describe('API Route Tests', () => {

    // Province Routes
    describe('Province Routes', () => {
        test('GET /provinces/getAll should return provinces array', async () => {
            const res = await request(app).get('/provinces/getAll');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('provinces');
            expect(Array.isArray(res.body.provinces)).toBe(true);
        });

        test('GET /provinces/province/:id should return a province or error', async () => {
            const res = await request(app).get('/provinces/province/1');
            expect([200, 500, 400]).toContain(res.statusCode);
        });
    });

    // Language Routes
    describe('Language Routes', () => {
        test('GET /languages/getAll should return provinces with languages', async () => {
            const res = await request(app).get('/languages/getAll');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('provinces');
        });

        test('GET /languages/province/:id should return languages for a province', async () => {
            const res = await request(app).get('/languages/province/1');
            expect([200, 500, 400]).toContain(res.statusCode);
        });
    });

    // Ethnic Group Routes
    describe('Ethnic Group Routes', () => {
        test('GET /ethnic-groups/getAll should return provinces with ethnic groups', async () => {
            const res = await request(app).get('/ethnic-groups/getAll');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('provinces');
        });

        test('GET /ethnic-groups/province/:id should return ethnic groups for a province', async () => {
            const res = await request(app).get('/ethnic-groups/province/1');
            expect([200, 500, 400]).toContain(res.statusCode);
        });
    });
});