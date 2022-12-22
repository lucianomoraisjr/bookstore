import { SerchBook, setupSerchBook } from '@/domain/use-cases'
import { LoadBook } from '@/domain/contracts/repo'
import { BookNotExist } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'
describe('', () => {
  let sut: SerchBook
  let bookRepo: MockProxy<LoadBook>
  let name: string

  beforeAll(() => {
    name = 'any_name'
    bookRepo = mock()
    bookRepo.load.mockResolvedValue({ id: 1, author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })
  beforeEach(() => {
    sut = setupSerchBook(bookRepo)
  })

  it('should call LoadBook with correct input', async () => {
    await sut({ name })

    expect(bookRepo.load).toHaveBeenCalledTimes(1)
    expect(bookRepo.load).toHaveBeenCalledWith({ name: 'any_name' })
  })
  it('should rethrow if load undefined ', async () => {
    const promise = await sut({ name })

    expect(promise).toEqual({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })

  it('should rethrow if load undefined ', async () => {
    bookRepo.load.mockResolvedValueOnce(undefined)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new BookNotExist())
  })
})
