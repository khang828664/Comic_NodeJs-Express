FROM node:12.8.1
COPY ["./ComicSeverNode_1/package.json","./ComicSeverNode_1"]
RUN  yarn 
COPY ./ComicSeverNode_1 .
CMD  yarn start