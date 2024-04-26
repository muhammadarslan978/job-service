##################################################
#  Builder stage
##################################################
FROM node:20.11-slim as builder

# Install pnpm globally
RUN npm install -g pnpm@8.15.4

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if present) to /app
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN pnpm run build

##################################################
#  Runtime stage
##################################################
FROM node:20.11-slim as deployment_stage

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that your app runs on
EXPOSE 3000
EXPOSE 80

# Command to run your application
CMD ["node", "dist/main"]
