import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

import { ListBookPagination } from '@/domain/use-cases'

type HttpRequest = { page: string }
type Model = [ books: Array<{ name: string }>, amount: number ] | Error
export class ListBookPaginationController extends Controller {
  constructor (private readonly listBookPage: ListBookPagination) {
    super()
  }

  async perform ({ page }: HttpRequest): Promise<HttpResponse<Model>> {
    const promise = await this.listBookPage({ page: parseInt(page) })
    return ok(promise)
  }

  override buildValidators ({ page }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: page, fieldName: 'page' }).required().build()
    ]
  }
}
