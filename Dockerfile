# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY frontend/ ./

# Set API URL
ENV VITE_API_URL=/api

# Build frontend
RUN npm run build

# Stage 2: Backend with Frontend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./static

# Create data directory
RUN mkdir -p /app/data/tiles

# Expose port
EXPOSE 8000

# Start application
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}