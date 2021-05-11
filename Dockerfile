FROM node:lts-alpine3.13

COPY . .

RUN npm install

HEALTHCHECK CMD ["nc", "-vz", "localhost", "8080"]

CMD ["npm", "start"]