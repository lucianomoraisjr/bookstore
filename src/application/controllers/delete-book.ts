import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unprocessableEntity } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { BookNotExist } from '@/domain/errors'

import { AlterBook } from '@/domain/use-cases'

type HttpRequest = { sbn: string }
type Model = Error | { message: string }

export class DeleteBookController extends Controller {
  constructor (private readonly alterBook: AlterBook) {
    super()
  }

  async perform ({ sbn }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.alterBook({ sbn })
      return ok({ message: 'Delete Success' })
    } catch (error) {
      if (error instanceof BookNotExist) return unprocessableEntity(error)
      throw error
    }
  }

  override buildValidators ({ sbn }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: sbn, fieldName: 'sbn' }).required().build()
    ]
  }
}
