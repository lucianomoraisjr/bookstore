import { UpdateBookController } from '@/application/controllers'
import { makeAlterBook } from '@/main/factories/domain/use-cases'

export const makeUpdateBookController = (): UpdateBookController => {
  return new UpdateBookController(makeAlterBook())
}
