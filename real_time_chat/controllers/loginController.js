const redis = require('../config/redis'); // Import the Redis client library for caching purposes

const express = require('express'); // Load the Express module for creating API endpoints

// Load required modules for user authentication:
const jwt = require('jsonwebtoken'); // JWT for generating tokens
const bcrypt = require('bcrypt'); // Bcrypt for hashing passwords

const router = express.Router(); // Create a new Express router object for modular routing

const pool = require('../config/database'); // Load the database connection pool

// Create a Redis client using default settings for caching operations
const client = redis();

// Set up an error listener for potential Redis connection issues
client.on('error', (error) => {
  console.error('Redis connection error:', error); // Log any errors during Redis connection
});

// Function to generate a random secret key with desired length for JWT signing
const generateSecretKey = () => {
  const secretKeyLength = 32; // Set the preferred length for the secret key
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Allowed characters for the key
  let secretKey = ''; // Initialize an empty string for the secret key

  for (let i = 0; i < secretKeyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index within character range
    secretKey += characters.charAt(randomIndex); // Append the character at the random index to the key string
  }

  return secretKey; // Return the generated random secret key
};

// POST /login - Endpoint to handle user login requests
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  try {
    const client = await pool.connect(); // Connect to the database pool

    // Retrieve user from database using email for authentication
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    client.release(); // Release the database connection after query

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' }); // User not found error
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' }); // Password mismatch error
    }

    // Successful login: Store user ID in Redis for potential caching
    client.set(email, user.id);

    // Generate a JWT token with user information and a secret key (use a more secure way to store the secret key in production)
    const secretKey = generateSecretKey();
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    // Send the JWT token back in the response for authorization
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any unexpected errors
  }
});

module.exports = router; // Export the router for integration with the main application
