export interface SaveClientRepositoryInterface {
  save (input: SaveClientRepositoryInterface.Input): Promise<void>
}

export namespace SaveClientRepositoryInterface {
  export type Input = {
    id: string
    identifier: string
    name: string
    email: string
    document: string
    birthDate: Date
    phoneNumber: string
    createdAt: Date
  }
}
