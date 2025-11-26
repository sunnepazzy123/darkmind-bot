# ------------------------------
# Production Dockerfile for Next.js
# ------------------------------

# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Next.js app
RUN npm run build

# ------------------------------
# Step 2: Production stage
# ------------------------------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package*.json /app/

# Set environment variable for API
ENV NEXT_PUBLIC_API_URL=https://darkmindbot.com/api

# Install only production dependencies
RUN npm install --production

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "start"]
