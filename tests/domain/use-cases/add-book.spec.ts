import { AddBook, setupAddBook } from '@/domain/use-cases'
import { ExistingBookError } from '@/domain/errors'
import { LoadBookByNanme, LoadBookBySbn, SaveBook } from '@/domain/contracts/repo'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Add Book', () => {
  let sut: AddBook
  let bookRepo: MockProxy<LoadBookByNanme & LoadBookBySbn & SaveBook>
  let book: { sbn: string, name: string, description: string, author: string, stock: number }

  beforeAll(() => {
    bookRepo = mock()
    bookRepo.loadByName.mockResolvedValue(undefined)
    bookRepo.loadBySbn.mockResolvedValue(undefined)
    book = { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
  })

  beforeEach(() => {
    sut = setupAddBook(bookRepo)
  })

  it('should call loadByNameBook with correct input', async () => {
    await sut(book)

    expect(bookRepo.loadByName).toHaveBeenCalledTimes(1)
    expect(bookRepo.loadByName).toHaveBeenCalledWith({ name: book.name })
  }
  )
  it('should call LoadBookBySbn with correct input', async () => {
    await sut(book)

    expect(bookRepo.loadBySbn).toHaveBeenCalledTimes(1)
    expect(bookRepo.loadBySbn).toHaveBeenCalledWith({ sbn: book.sbn })
  }
  )
  it('should rethrow if loadByName other than undefined ', async () => {
    bookRepo.loadByName.mockResolvedValueOnce({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1, id: 1 })

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new ExistingBookError())
  })
  it('should rethrow if loadByName other than undefined ', async () => {
    bookRepo.loadBySbn.mockResolvedValueOnce({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1, id: 1 })

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new ExistingBookError())
  })

  it('should rethrow if loadByNameBook throws', async () => {
    bookRepo.loadByName.mockRejectedValueOnce(new Error('loadByName_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('loadByName_error'))
  })

  it('should rethrow if LoadBookBySbn throws', async () => {
    bookRepo.loadBySbn.mockRejectedValueOnce(new Error('loadByName_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('loadByName_error'))
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
