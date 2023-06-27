export interface UpdateChargeStatusUseCaseInterface {
  execute(input: UpdateChargeStatusUseCaseInterface.Input): Promise<void>
}

export namespace UpdateChargeStatusUseCaseInterface {
  export type Input = {
    id: string
    status: string
    processingAttempts?: number
  }
}
