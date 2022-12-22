import { ListBookPaginationController } from '@/application/controllers'
import { makeListBookPagination } from '@/main/factories/domain/use-cases'

export const makeListBookPaginationController = (): ListBookPaginationController => {
  return new ListBookPaginationController(makeListBookPagination())
}
