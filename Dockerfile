# Base image
FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl libc6

# Create app directory
WORKDIR /app

ARG PORT
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG DATABASE_URL

ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY prisma ./prisma/
RUN npm run db:generate

# Bundle app source
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY src ./src

# Copy the .env and .env.development files
COPY .env ./

# Creates a "dist" folder with the build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the build
CMD ["npm", "run", "start:dev"]
