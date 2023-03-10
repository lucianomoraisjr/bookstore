import { Required } from '@/application/validation'
import { RequiredFieldError } from '@/application/errors'

describe('Required', () => {
  it('should return RequiredFieldError if value is null', () => {
    const sut = new Required(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new Required(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
  it('should return RequiredFieldError not field if value is undefined ', () => {
    const sut = new Required(undefined as any)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return undefined if value is not empty', () => {
    const sut = new Required('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
