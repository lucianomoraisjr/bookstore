import { DeleteBookController } from '@/application/controllers'
import { makeDeleteBook } from '@/main/factories/domain/use-cases'

export const makeDeleteBookController = (): DeleteBookController => {
  return new DeleteBookController(makeDeleteBook())
}
