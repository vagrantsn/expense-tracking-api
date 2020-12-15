FROM node:14.15.1-alpine

WORKDIR /app

COPY . .

RUN yarn install
