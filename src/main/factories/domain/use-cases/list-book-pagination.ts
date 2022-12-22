import { ListBookPagination, setupListBookPagination } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/infra/repos/postgres'

export const makeListBookPagination = (): ListBookPagination => {
  return setupListBookPagination(makePgBookRepository())
}
