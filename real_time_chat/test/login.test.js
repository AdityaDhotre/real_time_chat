// Author: Aditya Dhotre

const request = require('supertest'); // Import supertest for crafting HTTP requests in tests
const app = require('../server'); // Import the server application being tested

// Test suite dedicated to Login API functionality
describe('Login API', () => {
  // Nested test suite focusing on the POST /login endpoint
  describe('POST /login', () => {
    // Test case to verify successful login with correct credentials
    it('should allow login with valid email and password', async () => {
      const validCredentials = {
        email: 'aditya@npci.com',
        password: '1234' // (Assuming password is hashed in production)
      };

      const response = await request(app)
        .post('/login') // Send a POST request to /login
        .send(validCredentials); // Include valid credentials in the request body

      // Assert expected status code (200 for success)
      expect(response.status).toBe(200);

      // Assert response contains a success message and a token
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('token');
    });

    // Test case to simulate failed login with incorrect credentials
    it('should return 401 (unauthorized) for invalid credentials', async () => {
      const invalidCredentials = {
        email: 'invalid@npci.com',
        password: 'invalidpassword'
      };

      const response = await request(app)
        .post('/login')
        .send(invalidCredentials);

      // Assert expected status code (401 for unauthorized)
      expect(response.status).toBe(401);

      // Assert response contains an error message about invalid credentials
      expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });

    // Test case to simulate a server-side error during login
    it('should return 500 (internal server error) on unexpected issues', async () => {
      const incompleteRequest = {}; // Intentionally sending an incomplete request

      const response = await request(app)
        .post('/login')
        .send(incompleteRequest);

      // Assert expected status code (500 for internal server error)
      expect(response.status).toBe(500);

      // Assert response contains an error message about an internal server error
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
