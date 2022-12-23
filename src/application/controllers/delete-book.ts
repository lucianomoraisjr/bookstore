import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

import { AlterBook } from '@/domain/use-cases'

type HttpRequest = { sbn: string }
type Model = Error | { message: string }

export class DeleteBookController extends Controller {
  constructor (private readonly alterBook: AlterBook) {
    super()
  }

  async perform ({ sbn }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.alterBook({ sbn })
    return ok({ message: 'Delete Success' })
  }

  override buildValidators ({ sbn }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: sbn, fieldName: 'sbn' }).required().build()
    ]
  }
}
