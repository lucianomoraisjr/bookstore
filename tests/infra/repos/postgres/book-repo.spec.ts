import { PgRepository, PgBookRepository } from '@/infra/repos/postgres/'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { PgBook } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('', () => {
  let sut: PgBookRepository
  let connection: PgConnection
  let pgBookRepo: Repository<PgBook>
  let backup: IBackup
  let input: { sbn: string, name: string, description: string, author: string, stock: number }

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
    it('should return an book if sbn exists', async () => {
      await pgBookRepo.save(input)

      const book = await sut.load({ sbn: 'any_sbn' })

      expect(book).toMatchObject({ id: 1 })
    })

    it('should return an undefined if sbn exists', async () => {
      const book = await sut.load({ sbn: 'any_sbn' })

      expect(book).toBeUndefined()
    })
  })

  describe('save', () => {
    it('should create an book', async () => {
      const { id } = await sut.save(input)

      const pgbook = await pgBookRepo.findOne({ sbn: 'any_sbn' })

      expect(pgbook?.id).toBe(1)
      expect(id).toBe(1)
    })
  })
})
