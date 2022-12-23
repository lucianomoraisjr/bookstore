import { AlterBook, setupAlterBook } from '@/domain/use-cases'
import { NameUnavailable } from '@/domain/errors'
import { LoadBook, UpdateBook } from '@/domain/contracts/repo'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AlterBook', () => {
  let sut: AlterBook
  let bookRepo: MockProxy<LoadBook & UpdateBook>
  let book: { id: number, sbn: string, name: string, description: string, author: string, stock: number }
  beforeAll(() => {
    bookRepo = mock()
    book = { id: 1, author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
  })
  beforeEach(() => {
    sut = setupAlterBook(bookRepo)
  })
  it('should call LoadBook with correct input', async () => {
    await sut(book)
    expect(bookRepo.load).toHaveBeenCalledTimes(1)
    expect(bookRepo.load).toBeCalledWith({ name: 'any_name' })
  })
  it('should throw NameUnavailable if name', async () => {
    bookRepo.load.mockResolvedValueOnce(book)

    const promise = sut(book)
    await expect(promise).rejects.toThrow(new NameUnavailable())
  })
  it('should call UpdateBook with correct input', async () => {
    await sut(book)
    expect(bookRepo.update).toHaveBeenCalledTimes(1)
    expect(bookRepo.update).toBeCalledWith({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })

  it('should rethrow if LoadBook throws', async () => {
    bookRepo.load.mockRejectedValueOnce(new Error('Load_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('Load_error'))
  })

  it('should rethrow if when LoadBook throws', async () => {
    bookRepo.load.mockRejectedValueOnce(new Error('Up_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('Up_error'))
  })
})
