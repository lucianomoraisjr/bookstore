import { SerchBook, setupSerchBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/infra/repos/postgres'

export const makeSerchBook = (): SerchBook => {
  return setupSerchBook(makePgBookRepository())
}
