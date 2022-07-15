FROM node:12.2.0-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN yarn install


COPY . .

EXPOSE 8000

CMD [ "yarn", "start" ]