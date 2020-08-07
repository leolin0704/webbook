FROM node:12.18.3

WORKDIR /work

COPY . /work

RUN npm install
RUN npm run build
EXPOSE 9527

ENTRYPOINT [ "npm run start" ]