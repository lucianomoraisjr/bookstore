module.exports = {
  type: process.env.PG_DB_TYPE,
  host: process.env.PG_DB_HOST,
  port: process.env.PG_DB_PORT,
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_BASE,
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/entities/index.{js,ts}`
  ],
  migrations: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/migrations/*.ts`],
  cli: {
    migrationsDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/migrations`
  }

}
