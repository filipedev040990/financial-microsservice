export interface GetChargeToProcessUseCaseInterface {
  execute(): Promise<GetChargeToProcessUseCaseInterface.Output [] | undefined>
}

export namespace GetChargeToProcessUseCaseInterface {
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
