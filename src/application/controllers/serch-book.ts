import { Controller } from '@/application/controllers'
import { HttpResponse, unprocessableEntity, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { BookNotExist } from '@/domain/errors'
import { SerchBook } from '@/domain/use-cases'

type HttpRequest = { name: string }
type Model = Error | { sbn: string, name: string, description: string, author: string, stock: number }

export class SerchBookController extends Controller {
  constructor (private readonly serchBook: SerchBook) {
    super()
  }

  async perform ({ name }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const book = await this.serchBook({ name })
      return ok(book)
    } catch (error) {
      if (error instanceof BookNotExist) return unprocessableEntity(error)
      throw error
    }
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required().build()
    ]
  }
}
