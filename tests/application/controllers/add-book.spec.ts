import { AddBookController, Controller } from '@/application/controllers'
import { ExistingBookError } from '@/domain/errors'
import { ServerError } from '@/application/errors'

import { Required } from '@/application/validation'

describe('AddBookController', () => {
  let sut: AddBookController
  let addBook: jest.Mock
  let book: { sbn: string, name: string, description: string, author: string, stock: number }

  beforeAll(() => {
    addBook = jest.fn()
    book = { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
  })
  beforeEach(() => {
    sut = new AddBookController(addBook)
  })
  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(book)

    expect(validators).toEqual([
      new Required('any_author', 'author'),
      new Required('any_description', 'description'),
      new Required('any_name', 'name'),
      new Required(1, 'stock'),
      new Required('any_sbn', 'sbn')
    ])
  })

  it('should call AddBook with correct input', async () => {
    await sut.handle(book)

    expect(addBook).toHaveBeenCalledWith(book)
    expect(addBook).toHaveBeenCalledTimes(1)
  })

  it('should return 422 if AddBook fails', async () => {
    addBook.mockRejectedValueOnce(new ExistingBookError())

    const httpResponse = await sut.handle(book)

    expect(httpResponse).toEqual({
      statusCode: 422,
      data: new ExistingBookError()
    })
  })
  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    addBook.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(book)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('should return 200 if AddBook succeeds', async () => {
    const httpResponse = await sut.handle(book)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        message: 'the book added successfully'
      }
    })
  })
})
