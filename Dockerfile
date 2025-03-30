# Use Node.js 22.14.0 as the base image
FROM node:22.14.0

# Install MySQL server
RUN apt-get update && apt-get install -y mysql-server

# Set the working directory for the Node.js app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the ports for Node.js and MySQL
EXPOSE 3000 3306

# Environment variables for MySQL setup
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=questionnaire

# Start both MySQL and Node.js
CMD service mysql start && npm start
