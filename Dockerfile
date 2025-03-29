# React frontend Dockerfile

FROM node:14

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server to serve the built React app
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port the app will run on
EXPOSE 3000

