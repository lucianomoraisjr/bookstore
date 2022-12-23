export interface LoadBook {
  load: (input: LoadBook.Input) => Promise<LoadBook.Output>
}

export namespace LoadBook {
  export type Input = { sbn?: string, name?: string }
  export type Output = undefined | { id: number, sbn: string, name: string, description: string, author: string, stock: number }
}
export interface SaveBook {
  save: (input: SaveBook.Input) => Promise<SaveBook.Output>
}

export namespace SaveBook {
  export type Input = { sbn: string, name: string, description: string, author: string, stock: number }
  export type Output = { id: number }
}
export interface UpdateBook {
  update: (input: UpdateBook.Input) => Promise<void>
}

export namespace UpdateBook {
  export type Input = { sbn: string, name?: string, description?: string, author?: string, stock?: number }

}

export interface DeleteBook {
  delete: (input: DeleteBook.Input) => Promise<void>
}

export namespace DeleteBook {
  export type Input = { sbn: string }

}

export interface LoadBookPagination {
  loadPagination: (input: LoadBookPagination.Input) => Promise<LoadBookPagination.Output>
}

export namespace LoadBookPagination {
  export type Input = { page: number }
  export type Output = [books: Array<{ name: string }>, amount: number]
}
