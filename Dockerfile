FROM node:16
COPY package*.json ./
RUN npm i
COPY controller/ controller/
COPY database/ database/
COPY model/ model/
COPY tests/ tests/
COPY index.js api-routes.js ./
EXPOSE 8000
CMD ["npm", "start"]