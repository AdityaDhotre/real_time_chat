const WebSocketSktr = require('ws'); // Import the WebSocket library for real-time communication

const poolSktr = require('../config/database'); // Import the database connection pool for message persistence

const { publishToKafka } = require('../config/kafka'); // Import the function to publish messages to Kafka

// Create a standalone WebSocket server instance (not tied to an HTTP server)
const wssSktr = new WebSocketSktr.Server({ noServer: true });

// Handle new client connections to the WebSocket server
wssSktr.on('connection', function connectionSktr(wsSktr) {
  console.log('New client connected to the WebSocket server!');

  // Handle incoming messages from connected clients
  wsSktr.on('message', async function incomingSktr(messageSktr) {
    console.log('Received message from client:', messageSktr);

    // Broadcast the message to all connected clients except the sender
    wssSktr.clients.forEach(function eachSktr(clientSktr) {
      if (clientSktr !== wsSktr && clientSktr.readyState === WebSocketSktr.OPEN) {
        clientSktr.send(messageSktr); // Send the message to other connected clients
      }
    });
    // Author: Aditya Dhotre
    // Persist the message in the database for potential retrieval later
    try {
      const clientDbSktr = await poolSktr.connect(); // Connect to the database pool
      const resultSktr = await clientDbSktr.query('INSERT INTO messages (message) VALUES ($1) RETURNING *', [messageSktr]); // Insert message and retrieve its details
      const newMessageSktr = resultSktr.rows[0];
      clientDbSktr.release(); // Release the database connection after insertion
      console.log('Message saved to database:', newMessageSktr);
    } catch (errorSktr) {
      console.error('Error saving message to database:', errorSktr); // Log any errors during message persistence
    }

    // Publish the message to a Kafka topic for further processing (optional depending on your application requirements)
    await publishToKafka(messageSktr);
  });

  // Handle client disconnections from the WebSocket server
  wsSktr.on('close', () => {
    console.log('Client disconnected from the WebSocket server');
  });
});

module.exports = wssSktr; // Export the WebSocket server for integration with the application
