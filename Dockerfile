FROM danielpayet974/angular-cli:latest as builder
WORKDIR /usr/src/tmp
COPY ["./*.json", "./"]
COPY src src
COPY cordova
RUN npm i --loglevel verbose
RUN npm run build:prod
RUN mv cordova/www ../ && rm -rf tmp

FROM nginx:alpine
COPY cert/cert_chained.crt /etc/nginx/cert_chained.crt
COPY cert/private.key /etc/nginx/private.key
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/dist/* ./
