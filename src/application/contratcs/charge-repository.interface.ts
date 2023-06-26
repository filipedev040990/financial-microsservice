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

export interface SaveChargeTraceRepositoryInterface {
  saveTrace (input: SaveChargeTraceRepositoryInterface.Input): Promise<void>
}

export namespace SaveChargeTraceRepositoryInterface {
  export type Input = {
    id: string
    chargeId: string
    status: string
    createdAt: Date
  }
}

export interface UpdateChargeStatusRepositoryInterface {
  updateStatus (input: UpdateChargeStatusRepositoryInterface.Input): Promise<void>
}

export namespace UpdateChargeStatusRepositoryInterface {
  export type Input = {
    id: string
    status: string
    updatedAt: Date
  }
}
