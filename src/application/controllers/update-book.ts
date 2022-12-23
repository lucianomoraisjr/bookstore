import { Controller } from '@/application/controllers'
import { HttpResponse, unprocessableEntity, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { NameUnavailable, BookNotExist } from '@/domain/errors'
import { AlterBook } from '@/domain/use-cases'

type HttpRequest = { sbn: string, name?: string, description?: string, author?: string, stock?: number }
type Model = Error | { message: string }

export class UpdateBookController extends Controller {
  constructor (private readonly alterBook: AlterBook) {
    super()
  }

  async perform ({ name, sbn, author, description, stock }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.alterBook({ name, sbn, author, description, stock })
      return ok({ message: 'Update Success' })
    } catch (error) {
      if (error instanceof NameUnavailable || error instanceof BookNotExist) return unprocessableEntity(error)
      throw error
    }
  }

  override buildValidators ({ sbn }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: sbn, fieldName: 'sbn' }).required().build()
    ]
  }
}
