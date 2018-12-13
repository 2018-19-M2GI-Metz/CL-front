FROM danielpayet974/angular-cli:latest as builder
WORKDIR /usr/src/tmp
COPY ["./*.json", "./"]
COPY src src
RUN npm i --loglevel verbose
RUN npm run build:prod
RUN mv dist/ ../ && rm -rf tmp

FROM nginx:alpine

COPY ["cert_chained.crt", "private.key", "/etc/nginx/"]
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/dist/* ./
