#Development stage
FROM node:16 as development
WORKDIR /api/
COPY package*.json ./
RUN npm install
COPY ./api/src ./api/src
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /api/
# Build the app with devDependencies still installed from "development" stage
RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production

# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /api/ ./
CMD [ "node", "./build/index.js" ]