import { AlterBook, setupAlterBook } from '@/domain/use-cases'
import { NameUnavailable } from '@/domain/errors'
import { LoadBookByNanme, UpdateBook } from '@/domain/contracts/repo'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AlterBook', () => {
  let sut: AlterBook
  let bookRepo: MockProxy<LoadBookByNanme & UpdateBook>
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
    expect(bookRepo.loadByName).toHaveBeenCalledTimes(1)
    expect(bookRepo.loadByName).toBeCalledWith({ name: 'any_name' })
  })
  it('should throw NameUnavailable if name', async () => {
    bookRepo.loadByName.mockResolvedValueOnce({ id: 1, author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn_2', stock: 1 })

    const promise = sut(book)
    await expect(promise).rejects.toThrow(new NameUnavailable())
  })
  it('should call UpdateBook with correct input', async () => {
    await sut(book)
    expect(bookRepo.update).toHaveBeenCalledTimes(1)
    expect(bookRepo.update).toBeCalledWith({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })

  it('should rethrow if loadByNameBook throws', async () => {
    bookRepo.loadByName.mockRejectedValueOnce(new Error('loadByName_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('loadByName_error'))
  })

  it('should rethrow if when loadByNameBook throws', async () => {
    bookRepo.loadByName.mockRejectedValueOnce(new Error('Up_error'))

    const promise = sut(book)

    await expect(promise).rejects.toThrow(new Error('Up_error'))
  })
})
