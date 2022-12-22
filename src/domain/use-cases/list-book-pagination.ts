import { LoadBookPagination } from '@/domain/contracts/repo'

type Setup = (bookRepo: LoadBookPagination) => ListBookPagination

type Input = { page: number }
type Output = [ books: Array<{ name: string }>, amount: number ]
export type ListBookPagination = (input: Input) => Promise<Output>

export const setupListBookPagination: Setup = (bookRepo) => async ({ page }) => {
  return await bookRepo.loadPagination({ page })
}
