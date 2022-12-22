import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class migrationCreatBook1671712942766 implements MigrationInterface {
  name = 'migrationCreatBook1671712942766'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'book',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'sbn',
          type: 'varchar'

        },
        {
          name: 'nome',
          type: 'varchar'

        },
        {
          name: 'descricao',
          type: 'varchar'
        },
        {
          name: 'autor',
          type: 'varchar'

        },
        {
          name: 'estoque',
          type: 'float'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book')
  }
}
