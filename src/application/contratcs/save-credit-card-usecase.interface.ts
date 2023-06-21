export interface SaveCreditCardUseCaseInterface {
  execute (input: SaveCreditCardUseCaseInterface.Input): Promise<void>
}

export namespace SaveCreditCardUseCaseInterface {
  export type Input = {
    payerId: string
    encryptedData: string
  }
}
