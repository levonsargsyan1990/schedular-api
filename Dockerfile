FROM node:12.10.0-alpine

RUN apk add --no-cache --virtual .build-deps binutils-gold curl g++ gcc gnupg libgcc linux-headers make python
WORKDIR /api
COPY package.json /api

RUN npm install
COPY . /api/

RUN npm run build
CMD ["node","/api/dist/server.js"]