import { PgRepository, PgBookRepository } from '@/infra/repos/postgres/'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { PgBook } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('BookRepo', () => {
  let sut: PgBookRepository
  let connection: PgConnection
  let pgBookRepo: Repository<PgBook>
  let backup: IBackup
  let input: { sbn: string, name: string, description: string, author: string, stock: number }
  const inputUpdate = { author: 'any_author_up', description: 'any_description_up', name: 'any_name_up', sbn: 'any_sbn', stock: 2 }

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgBook])
    backup = db.backup()
    pgBookRepo = connection.getRepository(PgBook)
    input = { author: 'any_author', description: 'any_description', name: 'any_name', sbn: 'any_sbn', stock: 1 }
  })
  afterAll(async () => {
    await connection.disconnect()
  })
  beforeEach(() => {
    backup.restore()
    sut = new PgBookRepository()
  })

  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('load', () => {
    it('should return an book if sbn ou name exists', async () => {
      await pgBookRepo.save(input)

      const book = await sut.load({ sbn: 'any_sbn', name: 'any_name' })

      expect(book).toMatchObject({ id: 1 })
    })
    it('should return an book if  name exists', async () => {
      await pgBookRepo.save(input)

      const book = await sut.load({ name: 'any_name' })

      expect(book).toMatchObject({ id: 1 })
    })

    it('should return an undefined if sbn ou name does not exist', async () => {
      const book = await sut.load({ sbn: 'any_sbn', name: 'any_name' })

      expect(book).toBeUndefined()
    })
  })

  describe('save', () => {
    it('should create an book', async () => {
      const { id } = await sut.save(input)

      const pgbook = await pgBookRepo.findOne({ sbn: 'any_sbn', name: 'any_name' })

      expect(pgbook?.id).toBe(1)
      expect(id).toBe(1)
    })
  })

  describe('loadPagination', () => {
    it('should return an book if sbn exists', async () => {
      await pgBookRepo.save(input)

      const book = await sut.loadPagination({ page: 1 })

      expect(book).toEqual([[{ name: 'any_name' }], 1])
    })
  })
  describe('Update', () => {
    it('should return book update', async () => {
      await pgBookRepo.save(input)

      const { author, description, name, stock } = inputUpdate

      await sut.update({ sbn: input.sbn, author, description, name, stock })

      const book = await pgBookRepo.findOne({ sbn: input.sbn })

      expect(book).toMatchObject({ sbn: input.sbn, author: 'any_author_up', description: 'any_description_up', name: 'any_name_up', stock: 2 })
    })
  })

  describe('Delete', () => {
    it('should delete book', async () => {
      await pgBookRepo.save(input)

      await sut.delete({ sbn: input.sbn })

      const book = await pgBookRepo.findOne({ sbn: input.sbn })

      expect(book).toBeUndefined()
    })
  })
})
