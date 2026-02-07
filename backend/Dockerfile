FROM node:20-alpine

LABEL maintainer="Ramesh Mamuduru"
LABEL description="Dockerfile for Backend of E-commerce App"

WORKDIR /app
RUN npm install -g pm2
RUN npm -v

COPY package*.json ./
RUN  npm install

RUN pm2 start npm --name "backend" -- start
RUN pm2 status
RUN pm2 startup
RUN pm2 save

EXPOSE 3000
