import { SerchBookController } from '@/application/controllers'
import { makeSerchBook } from '@/main/factories/domain/use-cases'

export const makeSerchBookController = (): SerchBookController => {
  return new SerchBookController(makeSerchBook())
}
