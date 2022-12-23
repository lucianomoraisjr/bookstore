import { UpdateBook, LoadBookByNanme } from '@/domain/contracts/repo'
import { NameUnavailable } from '@/domain/errors'
type Setup = (bookRepo: UpdateBook & LoadBookByNanme) => AlterBook

type Input = { sbn: string, name?: string, description?: string, author?: string, stock?: number }

export type AlterBook = (input: Input) => Promise<void>

export const setupAlterBook: Setup = (bookRepo) => async ({ sbn, author, description, name, stock }) => {
  if (name) {
    const serchName = await bookRepo.loadByName({ name })
    if (serchName && sbn !== serchName.sbn) throw new NameUnavailable()
  }

  await bookRepo.update({ sbn, author, description, name, stock })
}
