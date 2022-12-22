import { Controller } from '@/application/controllers'
import { HttpResponse, unprocessableEntity, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { ExistingBookError } from '@/domain/errors'
import { AddBook } from '@/domain/use-cases'

type HttpRequest = { sbn: string, name: string, description: string, author: string, stock: number }
type Model = Error | { message: string }

export class AddBookController extends Controller {
  constructor (private readonly addBook: AddBook) {
    super()
  }

  async perform ({ author, description, name, sbn, stock }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.addBook({ author, description, name, sbn, stock })
      return ok({
        message: 'the book added successfully'
      })
    } catch (error) {
      if (error instanceof ExistingBookError) return unprocessableEntity(error)
      throw error
    }
  }

  override buildValidators ({ author, description, name, sbn, stock }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: author, fieldName: 'author' }).required().build(),
      ...Builder.of({ value: description, fieldName: 'description' }).required().build(),
      ...Builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: stock, fieldName: 'stock' }).required().build(),
      ...Builder.of({ value: sbn, fieldName: 'sbn' }).required().build()
    ]
  }
}
