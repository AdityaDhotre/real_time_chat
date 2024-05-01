const WebSocket = require('ws'); // Import the WebSocket library for client connections
const { r } = require('../config/kafka'); // Import Kafka producer (assuming r is the producer)

// Function to create a WebSocket client for testing purposes
const createTestClient = () => new WebSocket('ws://localhost:3000'); // Replace with actual URL

// Test suite dedicated to WebSocket server functionality
describe('WebSocket Server', () => {
  let client; // Reference to the created WebSocket client

  // Establish a WebSocket client connection before each test
  beforeEach(() => {
    client = createTestClient();
  });

  // Close the WebSocket client connection after each test
  afterEach(() => client.close());

  // Test case to verify successful connection establishment
  it('should establish a connection with the WebSocket server', (done) => {
    client.on('open', () => {
      // Connection opened successfully, signal test completion
      done();
    });
  });

  // Test case to simulate message sending and receiving
  it('should receive and broadcast messages from the WebSocket server', (done) => {
    const testMessage = 'This is a test message';

    client.on('message', (receivedData) => {
      // Assert received data matches the sent message
      expect(receivedData).toBe(testMessage);
      done();
    });

    client.send(testMessage);
  });

  // Test case to simulate message publishing to Kafka
  it('should publish messages to Kafka when received by the server', (done) => {
    const kafkaMessage = 'Message for Kafka testing';

    // Mock the publishToKafka function for testing purposes
    jest.spyOn(r, 'publish').mockImplementationOnce((topic, message) => {
      // Assert that the function was called with the correct message
      expect(message).toBe(kafkaMessage);
      done();
    });

    client.on('message', () => {
      // Trigger message sending to simulate server receiving it
      client.send(kafkaMessage);
    });
  });
});

// Author: Aditya Dhotre