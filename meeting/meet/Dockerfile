FROM node:alpine
WORKDIR /app

COPY package*.json ./ 
RUN yarn install

EXPOSE 9800
COPY . .
CMD ["yarn","start"]