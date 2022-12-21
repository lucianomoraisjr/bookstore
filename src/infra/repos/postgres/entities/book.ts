import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'book' })
export class PgBook {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    sbn!: string

  @Column()
    nome!: string

  @Column()
    descricao!: string

  @Column()
    autor!: string

  @Column()
    estoque!: number
}
