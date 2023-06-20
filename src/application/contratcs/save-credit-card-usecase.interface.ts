export interface SaveCreditCardUseCaseInterface {
  execute (input: SaveCreditCardUseCaseInterface.Input): Promise<void>
}

export namespace SaveCreditCardUseCaseInterface {
  export type Input = {
    brand: string
    number: string
    monthExpiration: string
    yearExpiration: string
  }
}
