import { setupListBookPagination, ListBookPagination } from '@/domain/use-cases'
import { LoadBookPagination } from '@/domain/contracts/repo'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ListBookPagination', () => {
  let sut: ListBookPagination
  let bookRepo: MockProxy<LoadBookPagination>
  beforeAll(() => {
    bookRepo = mock()
    bookRepo.loadPagination.mockResolvedValue([[{ name: 'livro1' }, { name: 'livro2' }], 2])
  })
  beforeEach(() => {
    sut = setupListBookPagination(bookRepo)
  })
  it('should call LoadBookPagination ', async () => {
    await sut()
    expect(bookRepo.loadPagination).toHaveBeenCalledTimes(1)
  })
  it('shoudl return LoadBookPagination', async () => {
    const promise = await sut()
    expect(promise).toEqual([[{ name: 'livro1' }, { name: 'livro2' }], 2])
  })
  it('should rethrow if LoadBookPagination throws', async () => {
    bookRepo.loadPagination.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut()

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })
})
