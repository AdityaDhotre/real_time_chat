// Import the Pool class from the pg (PostgreSQL) library
const { Pool } = require('pg');

// Configure PostgreSQL connection parameters
const pool = new Pool({
    user: 'postgres', // Username
    host: 'localhost', // Server address
    database: 'chat_stream', // Database name
    password: 'root', // Password
    port: 5432, // Port number
});

// Export the pool instance for use in other parts of the application
module.exports = pool;
