export interface GetChargeByStatusUseCaseInterface {
  execute(status: string): Promise<GetChargeByStatusUseCaseInterface.Output [] | undefined>
}

export namespace GetChargeByStatusUseCaseInterface {
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
