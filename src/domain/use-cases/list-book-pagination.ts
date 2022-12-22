import { LoadBookPagination } from '@/domain/contracts/repo'

type Setup = (bookRepo: LoadBookPagination) => ListBookPagination

export type ListBookPagination = () => Promise<Output>
type Output = [ books: Array<{ name: string }>, amount: number ]
export const setupListBookPagination: Setup = (bookRepo) => async () => {
  return await bookRepo.loadPagination()
}
