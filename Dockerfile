FROM node:14.18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 

FROM node:14.18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn install --production --ignore-scripts --prefer-offline

RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001

USER reactjs

EXPOSE 3000

CMD yarn start