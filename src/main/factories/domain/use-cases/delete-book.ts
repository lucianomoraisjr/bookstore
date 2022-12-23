import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/infra/repos/postgres'

export const makeDeleteBook = (): DeleteBook => {
  return setupDeleteBook(makePgBookRepository())
}
