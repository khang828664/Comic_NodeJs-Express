# syntax=docker/dockerfile:1
FROM node:12.18.1
ENV NODE_ENV=deverloper
WORKDIR /ComicSeverNode_1
COPY ["package.json", "package-lock.json*","nodemon.json","./"]
RUN yarn add nodemon -D
RUN yarn
COPY . .
CMD ["yarn","dev"]
