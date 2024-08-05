FROM node:20 as dependencies
RUN apt-get update -y && apt-get install -y openssl libc6

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
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

COPY package.json /app

RUN npm install

COPY prisma ./prisma/

RUN npm run db:generate

FROM dependencies as build

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl libc6

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .


CMD ["npm", "run", "dev"]
