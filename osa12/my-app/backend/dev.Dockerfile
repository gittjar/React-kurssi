# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run the app when the container launches
CMD ["npm", "start"]