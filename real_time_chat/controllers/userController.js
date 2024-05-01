const express = require('express'); // Import the Express framework for building APIs

const router = express.Router(); // Create a router object to manage API endpoints

const bcrypt = require('bcrypt'); // Import the bcrypt library for secure password hashing

const pool = require('../config/database'); // Import the database connection pool

// POST /register - Endpoint to handle user registration requests
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Destructure username, email, and password from the request body

  // Validate that all required fields are provided in the request
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required fields' });
  }

  try {
    // Hash the password using bcrypt for secure storage
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is a common salt round value

    // Create a new user in the database with the hashed password
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    const newUser = result.rows[0];
    client.release();

    // Respond with the newly created user information (excluding the password)
    res.status(201).json(newUser); // 201 Created status code for successful creation
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal Server Error' }); // Use a more specific error code if possible
  }
});

// DELETE /:username - Endpoint to delete a user by their username
router.delete('/:username', async (req, res) => {
  const { username } = req.params; // Extract username from the request parameters

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
    const deletedUser = result.rows[0];
    client.release();

    if (deletedUser) {
      // User found and deleted successfully
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } else {
      // User not found in the database
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Use a more specific error code if possible
  }
});

// GET /users - Endpoint to retrieve a list of all users
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();

    // Respond with the list of users retrieved from the database
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Use a more specific error code if possible
  }
});

module.exports = router; // Export the router for use in the main application
