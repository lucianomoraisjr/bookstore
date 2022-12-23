import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { DeleteBook as DeleteBookInterface } from '@/domain/contracts/repo'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AlterBook', () => {
  let sut: DeleteBook
  let sbn: string
  let bookRepo: MockProxy<DeleteBookInterface>

  beforeAll(() => {
    bookRepo = mock()
    sbn = 'any_sbn'
  })
  beforeEach(() => {
    sut = setupDeleteBook(bookRepo)
  })
  it('should call LoadBook with correct input', async () => {
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
