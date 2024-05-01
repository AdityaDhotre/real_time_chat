// Author: Aditya Dhotre

const { Kafka } = require('kafkajs'); // Import Kafka client for producer functionality

// Create a Kafka producer instance with a descriptive client ID
const kafka = new Kafka({
  clientId: 'your-app-name', // Replace with your application's unique name
  brokers: ['localhost:9092'] // Array of Kafka broker addresses (may need modification)
});


const producer = kafka.producer(); // Create a producer for interacting with Kafka

// Asynchronous function to establish connection with the Kafka broker
async function connectKafka() {
  await producer.connect();
  console.log('Successfully connected to Kafka broker!');
}

// Function to publish messages to a specific Kafka topic
async function publishToKafka(message) {
  try {
    await producer.send({
      topic: 'chat-messages', // Replace if using a different topic name
      messages: [{ value: message }] // Array containing the message to be sent
    });
    console.log('Message sent to Kafka topic:', message);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

// Export these functions for use in other parts of your application
module.exports = { connectKafka, publishToKafka };
