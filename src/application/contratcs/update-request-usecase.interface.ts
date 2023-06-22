export interface UpdateRequestUseCaseInterface {
  execute (input: UpdateRequestUseCaseInterface.Input): Promise<void>
}

export namespace UpdateRequestUseCaseInterface {
  export type Input = {
    id: string
    output: string
    status: number
  }
}
