import { BookNotExist } from '@/domain/errors'
import { DeleteBook as DeleteBookInterface, LoadBookBySbn } from '@/domain/contracts/repo'

type Setup = (bookRepo: DeleteBookInterface & LoadBookBySbn) => DeleteBook
type Input = { sbn: string }

export type DeleteBook = (input: Input) => Promise<void>

export const setupDeleteBook: Setup = (bookRepo) => async ({ sbn }) => {
  const book = await bookRepo.loadBySbn({ sbn })
  if (book === undefined) throw new BookNotExist()
  await bookRepo.delete({ sbn })
}
