import { SerchBookController, Controller } from '@/application/controllers'
import { Required } from '@/application/validation'
import { ServerError } from '@/application/errors'
import { BookNotExist } from '@/domain/errors'
describe('SerchBookController', () => {
  let sut: SerchBookController
  let serchBook: jest.Mock
  let name: string
  beforeAll(() => {
    name = 'any_name'
    serchBook = jest.fn()
    serchBook.mockResolvedValue({ author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 })
  })
  beforeEach(() => {
    sut = new SerchBookController(serchBook)
  })
  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name })

    expect(validators).toEqual([
      new Required('any_name', 'name')
    ])
  })

  it('should call SerchBook with correct input', async () => {
    await sut.handle({ name })

    expect(serchBook).toHaveBeenCalledWith({ name })
    expect(serchBook).toHaveBeenCalledTimes(1)
  })

  it('should return 422 if serchBook fails', async () => {
    serchBook.mockRejectedValueOnce(new BookNotExist())

    const httpResponse = await sut.handle({ name })

    expect(httpResponse).toEqual({
      statusCode: 422,
      data: new BookNotExist()
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    serchBook.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ name })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ name })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
    })
  })
})
