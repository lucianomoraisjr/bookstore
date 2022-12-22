import { LoadBook, SaveBook, LoadBookPagination } from '@/domain/contracts/repo'
import { PgRepository } from '@/infra/repos/postgres/repository'
import { PgBook } from '@/infra/repos/postgres/entities'

export class PgBookRepository extends PgRepository implements LoadBook, SaveBook, LoadBookPagination {
  private readonly pgbookRepo = this.getRepository(PgBook)

  async load ({ sbn }: LoadBook.Input): Promise<LoadBook.Output> {
    const book = await this.pgbookRepo.findOne({ sbn })
    if (book) {
      const { author, description, id, name, sbn, stock } = book
      return { author, description, id, name, sbn, stock }
    }
    return undefined
  }

  async save (input: SaveBook.Input): Promise<SaveBook.Output> {
    const { id } = await this.pgbookRepo.save(input)
    return { id }
  }

  async loadPagination ({ page }: LoadBookPagination.Input): Promise<LoadBookPagination.Output> {
    const take = 10
    const [list, count] = await this.pgbookRepo.findAndCount({
      select: ['name'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * take,
      take
    })
    return [
      list,
      count
    ]
  }
}
