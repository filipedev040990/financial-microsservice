export interface SaveChargeUseCaseInterface {
  execute(input: SaveChargeUseCaseInterface.Input): Promise<string>
}

export namespace SaveChargeUseCaseInterface {
  export type Input = {
    clientId: string
    payerId: string
    status: string
    totalValue: number
    paymentMethod: string
  }
}
