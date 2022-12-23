FROM node:16 AS deps
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build
RUN npm run test:coverage

FROM node:16 AS runner
WORKDIR /app

COPY ./package.json ./
COPY ./ormconfig.js ./

COPY --from=deps /app/dist ./dist

RUN npm install --only=prod

ENV PG_DB_TYPE postgres
ENV PG_DB_HOST postgres-compose
ENV PG_DB_PORT 5432
ENV PG_DB_USERNAME postgres
ENV PG_DB_PASSWORD Postgres2019!
ENV PG_DB_BASE postgres
ENV API_PORT 5050

