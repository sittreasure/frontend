FROM node:11.6.0 AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV REACT_APP_API_URL=https://api-gateway-dev.treasure-hunter.dev

ENV REACT_APP_TOMCAT_URL=http://10.4.56.86:8080

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.14.2-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]