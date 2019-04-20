FROM node:10.15.1 AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --ignore-platform

COPY . .

RUN yarn build

FROM nginx:1.14.2-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]