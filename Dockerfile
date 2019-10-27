FROM node:11.6.0 AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG REACT_APP_API_URL

ARG REACT_APP_TOMCAT_URL

ARG REACT_APP_FACEBOOK_ID

COPY package.json .

COPY yarn.lock .

RUN yarn install

RUN yarn add increase-memory-limit

RUN node --max-old-space-size=1024

COPY . .

RUN yarn build

FROM nginx:1.14.2-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]