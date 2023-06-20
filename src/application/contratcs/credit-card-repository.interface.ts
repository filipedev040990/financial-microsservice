export interface SaveCreditCardRepositoryInterface {
  save (input: SaveCreditCardRepositoryInterface.Input): Promise<void>
}

export namespace SaveCreditCardRepositoryInterface {
  export type Input = {
    id: string
    identifier: string
    brand: string
    number: string
    expiration: string
    createdAt: Date
  }
}
