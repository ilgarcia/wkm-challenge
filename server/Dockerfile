# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ sqlite-dev

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]

