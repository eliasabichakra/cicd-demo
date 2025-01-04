const chai = require('chai');
const request = require('supertest'); // Keep supertest for making HTTP requests
const { expect } = chai;
const server = require('../server'); // Import the server

describe('GET /api/data', () => {
    it('should return JSON data with a success message', async () => {
        const res = await request(server).get('/api/data');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Hello, this is a sample API!');
        expect(res.body).to.have.property('success', true);
        expect(res.body.data).to.include({
            name: 'John Doe',
            age: 137,
            profession: 'Software Developer'
        });
    });
});
