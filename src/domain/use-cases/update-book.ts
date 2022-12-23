import { UpdateBook, LoadBookByNanme, LoadBookBySbn } from '@/domain/contracts/repo'
import { NameUnavailable, BookNotExist } from '@/domain/errors'
type Setup = (bookRepo: UpdateBook & LoadBookByNanme & LoadBookBySbn) => AlterBook

type Input = { sbn: string, name?: string, description?: string, author?: string, stock?: number }

export type AlterBook = (input: Input) => Promise<void>

export const setupAlterBook: Setup = (bookRepo) => async ({ sbn, author, description, name, stock }) => {
  const serchSbn = await bookRepo.loadBySbn({ sbn })
  if (serchSbn === undefined) throw new BookNotExist()
  if (name) {
    const serchName = await bookRepo.loadByName({ name })
    if (serchName && sbn !== serchName.sbn) throw new NameUnavailable()
  }

  await bookRepo.update({ sbn, author, description, name, stock })
}
