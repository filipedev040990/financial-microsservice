export interface SaveCreditCardRepositoryInterface {
  save (input: SaveCreditCardRepositoryInterface.Input): Promise<void>
}

export namespace SaveCreditCardRepositoryInterface {
  export type Input = {
    id: string
    payerId: string
    externalIdentifier: string
    createdAt: Date
  }
}
