# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 8080 for the application
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "start" ]

