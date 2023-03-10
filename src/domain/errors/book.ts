export class ExistingBookError extends Error {
  constructor () {
    super('Existing book')
    this.name = 'ExistingBook'
  }
}
export class BookNotExist extends Error {
  constructor () {
    super('Book does not exist')
    this.name = 'BookNotExist'
  }
}

export class NameUnavailable extends Error {
  constructor () {
    super('Name unavailable')
    this.name = 'NameUnavailable'
  }
}
