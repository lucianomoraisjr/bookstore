import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'book' })
export class PgBook {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    sbn!: string

  @Column({ name: 'nome' })
    name!: string

  @Column({ name: 'descricao' })
    description!: string

  @Column({ name: 'autor' })
    author!: string

  @Column({ name: 'estoque' })
    stock!: number

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date
}
