const request = require('supertest'); // Import supertest for making HTTP requests in tests

const app = require('../server'); // Import the server application for testing

// Test suite for the "Get Users" API endpoint
describe('Get Users API', () => {
  // Test cases specifically targeting the GET /users endpoint
  describe('GET /users', () => {
    // Test to verify successful retrieval of all users
    it('should return a list of all users', async () => {
      const response = await request(app).get('/users'); // Send a GET request to /users

      // Assert expected status code (200 for success)
      expect(response.status).toBe(200);

      // Assert that the response body is an array containing user data
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});

// Author: Aditya Dhotre