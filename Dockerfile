FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 

FROM node:16-alpine AS build-stage
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
