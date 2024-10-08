ARG UBUNTU_VERSION=22.04@sha256:b060fffe8e1561c9c3e6dea6db487b900100fc26830b9ea2ec966c151ab4c020
ARG NODE_VERSION=14.16.0

FROM ubuntu:$UBUNTU_VERSION as node

RUN chmod 1777 /tmp

# install node
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  curl ca-certificates && \
  rm -rf /var/lib/apt/lists/*
ARG NODE_VERSION
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE
ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH
RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/
RUN npm i -g yarn

FROM node as build

WORKDIR /app

COPY ./back-strapi .

RUN yarn install --production --prefer-offline && \
  yarn cache clean

ENV NODE_ENV production

RUN yarn build

FROM node as server

RUN apt-get update && apt-get install -y libnss3 ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
  libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 \
  libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils && \
  rm -rf /var/lib/apt/lists/*

RUN ln -s /app/public/uploads /uploads

EXPOSE 1337
WORKDIR /app
ENV NODE_ENV production
CMD ["yarn", "start"]

COPY --from=build /app /app
