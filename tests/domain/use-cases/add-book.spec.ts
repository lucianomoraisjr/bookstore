import { AddBook, setupAddBook } from '@/domain/use-cases'
import { ExistingBookError } from '@/domain/errors'
import { LoadBook, SaveBook } from '@/domain/contracts/repo'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Add Book', () => {
  let sut: AddBook
  let bookRepo: MockProxy<LoadBook & SaveBook>
  let book: { sbn: string, name: string, description: string, author: string, stock: number }

  beforeAll(() => {
    bookRepo = mock()
    bookRepo.load.mockResolvedValue(undefined)
    book = { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
  })

  beforeEach(() => {
    sut = setupAddBook(bookRepo)
  })

  it('should call LoadBook with correct input', async () => {
    await sut(book)

    expect(bookRepo.load).toHaveBeenCalledTimes(1)
    expect(bookRepo.load).toHaveBeenCalledWith({ sbn: book.sbn })
  }
  )
  it('should rethrow if load other than undefined ', async () => {
    bookRepo.load.mockResolvedValueOnce({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1, id: 1 })

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new ExistingBookError())
  })

  it('should rethrow if LoadBook throws', async () => {
    bookRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should call SaveBook with correct input', async () => {
    await sut(book)

    expect(bookRepo.save).toHaveBeenCalledTimes(1)
    expect(bookRepo.save).toHaveBeenCalledWith(book)
  })

  it('should rethrow if SaveBook throws', async () => {
    bookRepo.save.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })
})
