import { DeleteBookController, Controller } from '@/application/controllers'
import { Required } from '@/application/validation'
import { ServerError } from '@/application/errors'
import { BookNotExist } from '@/domain/errors'

describe('SerchBookController', () => {
  let sut: DeleteBookController
  let deleteBook: jest.Mock
  let sbn: string

  beforeAll(() => {
    sbn = 'any_sbn'
    deleteBook = jest.fn()
  })
  beforeEach(() => {
    sut = new DeleteBookController(deleteBook)
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

  it('should call DeleteBook with correct input', async () => {
    await sut.handle({ sbn })

    expect(deleteBook).toHaveBeenCalledWith({ sbn })
    expect(deleteBook).toHaveBeenCalledTimes(1)
  })
  it('should return 422 if BookNotExist fails', async () => {
    deleteBook.mockRejectedValueOnce(new BookNotExist())

    const httpResponse = await sut.handle({ sbn })

    expect(httpResponse).toEqual({
      statusCode: 422,
      data: new BookNotExist()
    })
  })
  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    deleteBook.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ sbn })
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('should return 200 if DeleteBook succeeds', async () => {
    const httpResponse = await sut.handle({ sbn })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { message: 'Delete Success' }
    })
  })
})
