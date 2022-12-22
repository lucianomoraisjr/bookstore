import { ListBookPaginationController, Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'

import { Required } from '@/application/validation'
describe('ListBookPaginationController', () => {
  let sut: ListBookPaginationController
  let listbook: jest.Mock

  beforeAll(() => {
    listbook = jest.fn()
    listbook.mockResolvedValue([[{ name: 'any_name' }], 1])
  })
  beforeEach(() => {
    sut = new ListBookPaginationController(listbook)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ page: '1' })

    expect(validators).toEqual([
      new Required('1', 'page')
    ])
  })
  it('should call ListBookPagination with correct input', async () => {
    await sut.handle({ page: '1' })

    expect(listbook).toHaveBeenCalledWith({ page: 1 })
    expect(listbook).toHaveBeenCalledTimes(1)
  })
  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    listbook.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ page: 1 })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ page: 1 })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [[{ name: 'any_name' }], 1]
    })
  })
})
