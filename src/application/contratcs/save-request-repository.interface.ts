export interface SaveRequestRepositoryInterface {
  save (input: SaveRequestRepositoryInterface.Input): Promise<string>
}

export namespace SaveRequestRepositoryInterface {
  export type Input = {
    id: string
    path: string
    method: string
    input: string
    createdAt: Date
  }
}
