# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Start the application with nodemon
CMD ["nodemon", "index.js"]

# RUN
# docker-compose -f docker-compose.dev.yml up