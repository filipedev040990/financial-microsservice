export interface GetChargeByIdUseCaseInterface {
  execute(id: string): Promise<GetChargeByIdUseCaseInterface.Output | undefined>
}

export namespace GetChargeByIdUseCaseInterface {
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
