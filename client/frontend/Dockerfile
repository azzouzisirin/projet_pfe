FROM node:alpine
WORKDIR /app

COPY package*.json ./ 
RUN yarn install

EXPOSE 3000
COPY . .
CMD ["yarn","start"]