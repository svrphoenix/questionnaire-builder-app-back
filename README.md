# Questionnaire Backend

This is the backend service for the **Questionnaire Application**, built with
Node.js and Express.js. It provides RESTful APIs for managing questionnaires and
responses while connecting to a MySQL database for data storage.

## Features

- **Manage Questionnaires**: Add, edit, delete, and retrieve questionnaires.
- **Handle Responses**: Store responses related to questionnaires.
- **MySQL Database Support**: Leverages MySQL for relational data storage.
- **Robust Middleware**: Includes logging, CORS support, and error handling.
- **Scalable Design**: Modular structure for easy expansion and maintenance.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 22.14.0 or above.
- **MySQL**: A running MySQL instance for the database.
- **Docker**: Optional, for containerized deployment.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/svrphoenix/questionnaire-builder-app-back.git>
   cd <./questionnaire-builder-app-back>
   ```

bash npm install Configure environment variables:

Create a .env file in the project root with the following content:

env DB_DIALECT DB_PORT DB_HOSTNAME DB_USERNAME DB_PASSWORD DB_DATABASE

## Prepare the database:

Create a MySQL database named questionnaire or update the .env file to match
your setup.

Running Locally Start the server:

bash npm start Access the backend at: http://localhost:5001 API Endpoints Base
URL http://localhost:5001

## Routes

HTTP Method Endpoint Description

- - GET / Verify server is running
- - GET /questionnaires Retrieve all questionnaires
- - POST /questionnaires Create a new questionnaire
- - GET /questionnaires/:id Get questionnaire details
- - PUT /questionnaires/:id Update a questionnaire by ID
- - DELETE /questionnaires/:id Delete a questionnaire by ID
- - POST /responses Add a response

Middleware Logging: Uses morgan to log HTTP requests (dev mode for development,
short for production).

CORS: Configured to expose the Authorization header.

Error Handling: Custom middleware handles 404 errors and general errors
gracefully.

Deployment Using Docker Build the Docker image:

`bash docker build -t questionnaire-backend .`

## Run the container:

`bash docker run -p 5001:5001 --env-file .env questionnaire-backend `

## Technologies Used

Node.js: JavaScript runtime for building scalable applications.

Express.js: Minimalist web framework for creating APIs.

MySQL: Relational database for structured data storage.

Morgan: Middleware for HTTP request logging.

CORS: Middleware for handling Cross-Origin Resource Sharing.

License This project is licensed under the MIT License.
