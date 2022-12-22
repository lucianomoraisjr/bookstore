import { AddBook, setupAddBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/infra/repos/postgres'

export const makeAddBook = (): AddBook => {
  return setupAddBook(makePgBookRepository())
}
