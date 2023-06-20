export interface SaveChargeUseCaseInterface {
  execute(input: SaveChargeUseCaseInterface.Input): Promise<void>
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
