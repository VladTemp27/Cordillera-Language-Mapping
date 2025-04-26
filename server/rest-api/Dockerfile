FROM node:18-alpine

WORKDIR /usr/src/app

ENV PORT=2019
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=admin
ENV DB_PASSWORD=postgres
ENV DB_NAME=lang_map

COPY package.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]