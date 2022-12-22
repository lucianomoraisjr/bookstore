import { LoadBook, SaveBook } from '@/domain/contracts/repo'
import { ExistingBookError } from '@/domain/errors'
type Setup = (bookRepo: LoadBook & SaveBook) => AddBook
type Input = { sbn: string, name: string, description: string, author: string, stock: number }
export type AddBook = (input: Input) => Promise<void>

export const setupAddBook: Setup = (bookRepo) => async ({ sbn, name, description, author, stock }) => {
  const book = await bookRepo.load({ sbn })

  if (book !== undefined) throw new ExistingBookError()

  await bookRepo.save({ sbn, name, author, description, stock })
}
