FROM node:18-alpine

WORKDIR /usr/src/app

ENV PORT=2019

COPY package.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]