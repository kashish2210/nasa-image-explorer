FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV CHOKIDAR_USEPOLLING=true
ENV REACT_APP_API_URL=http://localhost:8000

# Start the React development server
CMD ["npm", "start"]
