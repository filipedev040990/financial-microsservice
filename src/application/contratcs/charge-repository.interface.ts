export interface SaveChargeRepositoryInterface {
  save (input: SaveChargeRepositoryInterface.Input): Promise<void>
}

export namespace SaveChargeRepositoryInterface {
  export type Input = {
    id: string
    clientId: string
    payerId: string
    status: string
    totalValue: number
    paymentMethod: string
    createdAt: Date
  }
}
