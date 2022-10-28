FROM node:16
COPY package*.json ./
RUN npm i
COPY . .
COPY index.js api-routes.js ./
EXPOSE 8000/tcp
CMD ["npm", "start"]