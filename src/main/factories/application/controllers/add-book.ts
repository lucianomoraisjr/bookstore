import { AddBookController } from '@/application/controllers'
import { makeAddBook } from '@/main/factories/domain/use-cases'

export const makeAddBookController = (): AddBookController => {
  return new AddBookController(makeAddBook())
}
