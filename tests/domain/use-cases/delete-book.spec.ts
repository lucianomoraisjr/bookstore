import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { DeleteBook as DeleteBookInterface, LoadBookBySbn } from '@/domain/contracts/repo'
import { BookNotExist } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AlterBook', () => {
  let sut: DeleteBook
  let sbn: string
  let bookRepo: MockProxy<DeleteBookInterface & LoadBookBySbn>
  let book: { id: number, sbn: string, name: string, description: string, author: string, stock: number }
  beforeAll(() => {
    bookRepo = mock()
    sbn = 'any_sbn'
    book = { id: 1, author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
    bookRepo.loadBySbn.mockResolvedValue(book)
  })
  beforeEach(() => {
    sut = setupDeleteBook(bookRepo)
  })

  it('should call LoadBook with correct input', async () => {
    await sut({ sbn })
    expect(bookRepo.loadBySbn).toHaveBeenCalledTimes(1)
    expect(bookRepo.loadBySbn).toBeCalledWith({ sbn })
  })

  it('should rethrow if loadBySbn other than undefined ', async () => {
    bookRepo.loadBySbn.mockResolvedValueOnce(undefined)

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new BookNotExist())
  })
  it('should call Delete with correct input', async () => {
    await sut({ sbn })
    expect(bookRepo.delete).toHaveBeenCalledTimes(1)
    expect(bookRepo.delete).toBeCalledWith({ sbn })
  })

  it('should rethrow if LoadBook throws', async () => {
    bookRepo.delete.mockRejectedValueOnce(new Error('Delet_error'))

    const promise = sut({ sbn })

    await expect(promise).rejects.toThrow(new Error('Delet_error'))
  })
})
