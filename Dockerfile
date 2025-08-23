# Use a specific Node.js base image (e.g., node:18-alpine for a smaller image)
FROM node:24.3-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3000

# Command to run your Node.js application when the container starts
CMD ["node", "./src/server.mjs"] 