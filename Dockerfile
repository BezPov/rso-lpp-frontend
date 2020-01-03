FROM node:12.13

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm install http-server -g
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]