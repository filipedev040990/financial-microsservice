export interface SaveClientUseCaseInterface {
  execute (input: SaveClientUseCaseInterface.Input): Promise<void>
}

export namespace SaveClientUseCaseInterface {
  export type Input = {
    identifier: string
    name: string
    email: string
    document: string
    birthDate: Date
    phoneNumber: string
  }
}
