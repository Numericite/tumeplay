FROM node:12-alpine AS builder

ENV ENVFILE="./environnements/env.dev.guyane"


ARG REACT_APP_API_URL
ARG REACT_APP_ZONE
ARG REACT_APP_OTHER_ZONE_URL
ARG REACT_APP_MATOMO_ID

ENV REACT_APP_API_URL='https://strapi.tumeplayguyane.fr'
ENV REACT_APP_ZONE='guyane'
ENV REACT_APP_OTHER_ZONE_URL='https://tumeplay.fr'
ENV REACT_APP_MATOMO_ID=$REACT_APP_MATOMO_ID

WORKDIR /

COPY *.json ./
COPY *.js ./
COPY *.lock ./

RUN apk update && apk add --no-cache git

RUN npm install

RUN sed -i.bak 's/module.exports = /export default /g' node_modules/react-native-device-info/src/web/index.js && sed -i.bak 's/module.exports=/export default /g' node_modules/react-native-device-info/lib/module/web/index.js && rm node_modules/react-native-device-info/src/web/index.js.bak

COPY src ./src
COPY public ./public
COPY ${ENVFILE} .env

RUN npm run build

FROM ghcr.io/socialgouv/docker/nginx4spa:8.1.1

COPY --from=builder --chown=nginx:nginx  /build /usr/share/nginx/html
