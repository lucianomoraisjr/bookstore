import { PgBookRepository } from '@/infra/repos/postgres'

export const makePgBookRepository = (): PgBookRepository => {
  return new PgBookRepository()
}
