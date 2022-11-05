FROM node:16-slim AS builder
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY public/ public/
COPY src/ src/
CMD ["npm", "start"]