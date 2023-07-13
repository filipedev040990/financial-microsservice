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
    processingAttempts: number
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
    processingAttempts?: number
    updatedAt: Date
  }
}

export interface GetChargeByIdRepositoryInterface {
  getById(id: string): Promise<GetChargeByIdRepositoryInterface.Output | undefined>
}

export namespace GetChargeByIdRepositoryInterface {
  export type Output = {
    id: string
    clientId: string
    payerId: string
    status: string
    totalValue: number
    paymentMethod: string
    createdAt: Date
    updatedAt: Date | null
    processingAttempts: number
  }
}
export interface GetChargeByStatusRepositoryInterface {
  getByStatus(status: string): Promise<GetChargeByStatusRepositoryInterface.Output [] | undefined>
}

export namespace GetChargeByStatusRepositoryInterface {
  export type Output = {
    id: string
    clientId: string
    payerId: string
    status: string
    totalValue: number
    paymentMethod: string
    createdAt: Date
    updatedAt: Date | null
    processingAttempts: number
  }
}

export interface GetChargeToProcessRepositoryInterface {
  getToProcess(status: string): Promise<GetChargeToProcessRepositoryInterface.Output [] | undefined>
}

export namespace GetChargeToProcessRepositoryInterface {
  export type Output = {
    client: {
      id: string
      identifier: string
      name: string
      email: string
      document: string
      birthDate: Date
      phoneNumber: string
    }
    payer: {
      id: string
      personType: string
      name: string
      email: string
      document: string
      phoneNumber: string
      cep: string
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
    }
    creditCard: {
      id: string
      payerId: string
      externalIdentifier: string
    }
    charge: {
      id: string
      clientId: string
      payerId: string
      totalValue: number
      paymentMethod: string
      processingAttempts: number
    }
  }
}
