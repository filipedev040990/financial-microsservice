export interface SaveCreditCardUseCaseInterface {
  execute (input: SaveCreditCardUseCaseInterface.Input): Promise<string>
}

export namespace SaveCreditCardUseCaseInterface {
  export type Input = {
    brand: string
    number: string
    monthExpiration: string
    yearExpiration: string
  }
}
