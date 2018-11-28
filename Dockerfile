FROM node:11.1 as builder
WORKDIR /usr/src/tmp
COPY ["./*.json", "./"]
COPY src src
RUN npm i --loglevel verbose --prod
RUN npm run build:prod
RUN mv dist/ ../ && rm -rf tmp

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/dist/* ./