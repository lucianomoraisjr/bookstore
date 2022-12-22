import { LoadBook } from '@/domain/contracts/repo'
import { BookNotExist } from '@/domain/errors'
type Setup = (bookRepo: LoadBook) => SerchBook
type Output = { sbn: string, name: string, description: string, author: string, stock: number }
type Input = { name: string }

export type SerchBook = (input: Input) => Promise<Output>

export const setupSerchBook: Setup = (bookRepo) => async ({ name }) => {
  const book = await bookRepo.load({ name })
  if (book) {
    const { author, description, name, sbn, stock } = book
    return { author, description, name, sbn, stock }
  }
  throw new BookNotExist()
}
