FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the built Nest.js application (from the dist directory)
COPY dist/ .

# Expose the port on which your Nest.js app is running
EXPOSE 3000

# Command to run your Nest.js app
CMD ["node", "main.js"]
