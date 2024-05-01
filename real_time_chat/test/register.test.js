// Author: Aditya Dhotre
const request = require('supertest'); // Import supertest for crafting HTTP requests in tests
const app = require('../server'); // Import the server application being tested

// Test suite dedicated to Register API functionality
describe('Register API', () => {
  // Nested test suite focusing on the POST /register endpoint
  describe('POST /register', () => {
    // Test case to verify successful user creation
    it('should create a new user account', async () => {
      const validUserData = {
        username: 'aditya', // Replace with a unique username for each test
        email: 'aditya@npci.com', // Consider using a temporary email service for testing
        password: '1234' // (Assuming password is hashed in production)
      };

      const response = await request(app)
        .post('/register') // Send a POST request to /register
        .send(validUserData); // Include valid user data in the request body

      // Assert expected status code (201 for creation)
      expect(response.status).toBe(201);

      // Assert response contains the newly created user's username and email (excluding password)
      expect(response.body).toHaveProperty('username', validUserData.username);
      expect(response.body).toHaveProperty('email', validUserData.email);
    });
  });
});
