# Chat Stream

## Description

Chat Stream: Your Personalized Communication Hub

Experience real-time connections! Chat Stream empowers you to connect with anyone, anytime. Join chat rooms, exchange messages instantly, and build meaningful interactions - all within a user-friendly interface.

## Technologies Used

- Node.js
- Express.js
- WebSocket
- PostgreSQL
- Redis
- JWT (JSON Web Tokens)
- bcrypt
- Jest
- Supertest

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Author](#author)

## Features

- **Live Chat Functionality:** Engage in dynamic conversations with other users in real-time.
- **Diverse Chat Rooms:** Explore various themed chat rooms catering to different interests and topics.
- **Robust User Security:** Ensures user privacy and security through JWT token-based authentication and bcrypt for password encryption.
- **Data Management:** Seamlessly manages user information with PostgreSQL database integration and Redis caching for optimized performance.
- **Instant Messaging:** Employs WebSocket technology for instantaneous communication between clients and the server.
- **Comprehensive Testing Suite:** Implements Jest framework for thorough unit testing, ensuring comprehensive test coverage.
- **Endpoint Validation:** Validates API endpoints effectively using Supertest library for robust integration testing.
- **Intuitive User Interface:** Delivers a user-friendly interface for a smooth and enjoyable chatting experience.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- PostgreSQL and Redis installed locally or remotely.


Follow these steps to run the Chat Stream App locally:

1. **Unzip the Chat Stream:**

2. **Navigate to the project directory:**

   ```bash
   cd real_time_chat
   ```


2. **Install Dependencies:**

   ```bash
   npm install
   ``` 

3. **DB Quries:**

   ```bash
   CREATE DATABASE chat_stream;

   -- Create the users table
      CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
      );

   -- Create the messages table
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );


   ``` 

4. **Run:**

 - `Start Project`
   ```bash
      node server.js
   ``` 

 - `Test Project`
   ```bash
      npm test
   ``` 

 - `Test Coverage`
   ```bash
      npm run coverage
   ``` 
## Usage

- **User Registration:** Users can register for an account using their email address and password.
- **User Login:** Registered users can log in to their accounts securely.
- **Join Chat Rooms:** Users can join existing chat rooms to participate in conversations.
- **Send Messages:** Users can send messages in chat rooms, and the messages will be displayed in real-time to other users in the same chat room.
- **Create Chat Rooms:** Admin users can create new chat rooms and manage them.
- **Logout:** Users can log out of their accounts to end their session securely.

- **User Registration:** Establish your presence in Chat Stream with a quick and secure registration process.
- **User Login:** Access your personalized chat space with a secure and effortless login experience.
- **Join Chat Rooms:** Discover vibrant chat rooms or create your own to connect and converse with like-minded individuals.
- **Send Messages:** Share your thoughts and ideas instantly - messages appear in real-time for others in the same chat room.
- **Create Chat Rooms:** (For authorized users) Manage the flow of conversation by creating and managing dedicated chat rooms.
- **Secure Sign Off:** End your session with peace of mind, knowing your account is securely logged out.

## API Endpoints

### Authentication

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.


### Messages

- **GET /api/messages:** Get all messages.
- **POST /api/messages:** Send a new message.
- **GET /api/messages/:id:** Get details of a specific message.
- **PUT /api/messages/:id:** Update details of a message.
- **DELETE /api/messages/:id:** Delete a message.

## Author

- ADITYA DHOTRE