export interface UpdateRequestRepositoryInterface {
  update (input: UpdateRequestRepositoryInterface.Input): Promise<void>
}

export namespace UpdateRequestRepositoryInterface {
  export type Input = {
    id: string
    output: string
    status: number
    updatedAt: Date
  }
}
