FROM node:12.2.0-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . .

EXPOSE 8900

CMD [ "npm", "run", "dev" ]