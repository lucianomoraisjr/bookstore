export interface LoadBook {
  load: (input: LoadBook.Input) => Promise<LoadBook.Output>
}

export namespace LoadBook {
  export type Input = { sbn: string }
  export type Output = undefined | { id: number, sbn: string, name: string, description: string, author: string, stock: number }
}
export interface SaveBook {
  save: (input: SaveBook.Input) => Promise<SaveBook.Output>
}

export namespace SaveBook {
  export type Input = { sbn: string, name: string, description: string, author: string, stock: number }
  export type Output = { id: number }
}

export interface LoadBookPagination {
  loadPagination: () => Promise<LoadBookPagination.Output>
}

export namespace LoadBookPagination {
  export type Output = [ books: Array<{ name: string }>, amount: number ]
}
