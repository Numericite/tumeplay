ARG NODE_VERSION=lts-alpine3.18@sha256:ef5e088232f803cadb83326edb4731015f42961d23a11510b109c2c98cfbb945

FROM node:$NODE_VERSION as dependencies
WORKDIR /app
ARG PRODUCTION
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:$NODE_VERSION as builder
WORKDIR /app
ARG PRODUCTION

ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_ID=$NEXT_PUBLIC_MATOMO_SITE_ID

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:$NODE_VERSION as runner
WORKDIR /app
ARG PRODUCTION
ENV NODE_ENV production

ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_ID=$NEXT_PUBLIC_MATOMO_SITE_ID

COPY package.json yarn.lock ./
# Remove dev dependencies
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Block crawlers for staging deployments
RUN if [ -z "$PRODUCTION" ]; then mv -f public/robots.staging.txt public/robots.txt; \
    else rm -f public/robots.staging.txt; fi

RUN chmod 1777 /tmp
RUN chmod 1777 /app

USER 1001

EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]
