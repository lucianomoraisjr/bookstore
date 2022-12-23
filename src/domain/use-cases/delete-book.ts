import { DeleteBook as DeleteBookInterface } from '@/domain/contracts/repo'

type Setup = (bookRepo: DeleteBookInterface) => DeleteBook
type Input = { sbn: string }

export type DeleteBook = (input: Input) => Promise<void>

export const setupDeleteBook: Setup = (bookRepo) => async ({ sbn }) => {
  await bookRepo.delete({ sbn })
}
