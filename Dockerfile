# Stage 1 — Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build Next.js in standalone mode
RUN npm run build

# Remove dev dependencies to keep the final image clean
RUN npm prune --omit=dev


# Stage 2 — Runtime stage (Distroless)
FROM gcr.io/distroless/nodejs20:nonroot

WORKDIR /app

# Copy only the standalone build output and required assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Run the app (standalone mode)
CMD ["server.js"]