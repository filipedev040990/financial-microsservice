export interface SaveCardExternalInterface {
  execute(creditCard: SaveCardExternalInterface.Input, token: string): Promise<string>
}

export namespace SaveCardExternalInterface {
  export type Input = {
    brand: string
    number: string
    expiryMonth: string
    expiryYear: string
  }
}
