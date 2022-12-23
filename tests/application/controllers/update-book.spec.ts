import { UpdateBookController, Controller } from '@/application/controllers'
import { Required } from '@/application/validation'
import { ServerError } from '@/application/errors'
import { NameUnavailable } from '@/domain/errors'
describe('SerchBookController', () => {
  let sut: UpdateBookController
  let updateBook: jest.Mock
  let book: { sbn: string, name: string, description: string, author: string, stock: number }
  beforeAll(() => {
    book = { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
    updateBook = jest.fn()
  })
  beforeEach(() => {
    sut = new UpdateBookController(updateBook)
  })
  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ sbn: 'any_sbn' })

    expect(validators).toEqual([
      new Required('any_sbn', 'sbn')
    ])
  })

  it('should call UpdateBook with correct input', async () => {
    await sut.handle(book)

    expect(updateBook).toHaveBeenCalledWith(book)
    expect(updateBook).toHaveBeenCalledTimes(1)
  })

  it('should return 422 if UpdateBook fails', async () => {
    updateBook.mockRejectedValueOnce(new NameUnavailable())

    const httpResponse = await sut.handle(book)

    expect(httpResponse).toEqual({
      statusCode: 422,
      data: new NameUnavailable()
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    updateBook.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(book)
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('should return 200 if UpdateBook succeeds', async () => {
    const httpResponse = await sut.handle(book)
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { message: 'Update Success' }
    })
  })
})
