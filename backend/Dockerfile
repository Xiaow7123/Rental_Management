# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Define environment variable
ENV NODE_ENV production

# Run app when the container launches
CMD ["node", "app.js"]
