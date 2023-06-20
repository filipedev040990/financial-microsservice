export interface SaveChargeTraceUseCaseInterface {
  execute(input: SaveChargeTraceUseCaseInterface.Input): Promise<void>
}

export namespace SaveChargeTraceUseCaseInterface {
  export type Input = {
    chargeId: string
    status: string
  }
}
