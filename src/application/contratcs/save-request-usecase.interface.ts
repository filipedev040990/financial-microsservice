export interface SaveRequestUseCaseInterface {
  execute(input: SaveRequestUseCaseInterface.Input): Promise<string>
}

export namespace SaveRequestUseCaseInterface {
  export type Input = {
    path: string
    method: string
    input: string
  }
}
