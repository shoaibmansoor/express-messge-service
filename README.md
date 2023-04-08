# Express Messages API

A simple REST API for managing messages, built using Node.js and Express. This API provides CRUD operations for managing messages and includes Swagger documentation for easy testing.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal or command prompt.
3. Run `npm install` to install the necessary dependencies.

## Usage

1. Start the Express server by running `node app.js` in your terminal or command prompt.
2. The server will start on port 3000. You can access the API at http://localhost:3000/messages.
3. Use tools like Postman or curl to test the CRUD operations on messages.
4. Access the Swagger documentation at http://localhost:3000/api-docs to explore and test the API endpoints.

## API Endpoints

- `GET /messages`: List all messages
- `POST /messages`: Add a new message
- `PUT /messages/:id`: Update a message by ID
- `DELETE /messages/:id`: Delete a message by ID
