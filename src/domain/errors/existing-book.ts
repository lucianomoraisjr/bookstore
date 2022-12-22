export class ExistingBookError extends Error {
  constructor () {
    super('Existing book')
    this.name = 'ExistingBook'
  }
}
