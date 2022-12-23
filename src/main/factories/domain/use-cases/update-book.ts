import { AlterBook, setupAlterBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/infra/repos/postgres'

export const makeAlterBook = (): AlterBook => {
  return setupAlterBook(makePgBookRepository())
}
