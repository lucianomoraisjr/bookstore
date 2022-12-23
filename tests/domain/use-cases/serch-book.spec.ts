import { SerchBook, setupSerchBook } from '@/domain/use-cases'
import { LoadBookByNanme } from '@/domain/contracts/repo'
import { BookNotExist } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'
describe('SerchBook', () => {
  let sut: SerchBook
  let bookRepo: MockProxy<LoadBookByNanme>
  let name: string

  beforeAll(() => {
    name = 'any_name'
    bookRepo = mock()
    bookRepo.loadByName.mockResolvedValue({ id: 1, author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })
  beforeEach(() => {
    sut = setupSerchBook(bookRepo)
  })

  it('should call loadByNameBook with correct input', async () => {
    await sut({ name })

    expect(bookRepo.loadByName).toHaveBeenCalledTimes(1)
    expect(bookRepo.loadByName).toHaveBeenCalledWith({ name: 'any_name' })
  })
  it('should rethrow if loadByName undefined ', async () => {
    const promise = await sut({ name })

    expect(promise).toEqual({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })

  it('should rethrow if loadByName undefined ', async () => {
    bookRepo.loadByName.mockResolvedValueOnce(undefined)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new BookNotExist())
  })
})
