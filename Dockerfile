FROM node:12.10.0-alpine

RUN apk add --no-cache --virtual .build-deps binutils-gold curl g++ gcc gnupg libgcc linux-headers make python
WORKDIR /schedule-api
COPY package.json /schedule-api

RUN npm install
COPY . /schedule-api/

RUN npm run build
CMD ["node","/schedule-api/dist/server.js"]