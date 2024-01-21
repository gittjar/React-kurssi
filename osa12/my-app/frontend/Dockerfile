# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the app for production
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]