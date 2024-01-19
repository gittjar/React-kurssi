# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build the application
RUN npm run build

# Use serve to serve the build folder on port 5000
RUN npm install -g serve
CMD serve -s build -l 5000


# COMMANDS
# docker build --build-arg REACT_APP_BACKEND_URL=http://localhost:3000 -t todo-frontend .
# docker run -p 5000:5000 todo-frontend
