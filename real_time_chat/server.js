// Author: Aditya Dhotre

const express = require('express'); // Import Express for building the REST API
const bodyParser = require('body-parser'); // Import middleware for parsing request bodies
const userRouter = require('./controllers/userController'); // Import routes for user management
const loginRouter = require('./controllers/loginController'); // Import routes for user login
const socketController = require('./controllers/socketController'); // Import logic for handling WebSocket connections

// Create an Express application instance
const app = express();

// Apply middleware to parse request bodies:
app.use(bodyParser.urlencoded({ extended: false })); // Handle URL-encoded form data
app.use(bodyParser.json()); // Parse incoming JSON data

// Mount user and login routes under specific API paths
app.use('/api/users', userRouter);
app.use('/api', loginRouter);

// Create an HTTP server using Express (can be replaced with a different HTTP server if needed)
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

// Enhance the HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head, done) => {
  // Delegate WebSocket upgrade handling to a dedicated controller
  socketController.handleUpgrade(request, socket, head, (ws) => {
    // Emit a 'connection' event when a WebSocket connection is established
    socketController.emit('connection', ws, request);
    done(ws); // Signal successful upgrade to WebSocket
  });
});
