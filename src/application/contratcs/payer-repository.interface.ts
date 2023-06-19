export interface SavePayerRepositoryInterface {
  save (input: SavePayerRepositoryInterface.Input): Promise<void>
}

export namespace SavePayerRepositoryInterface {
  export type Input = {
    id: string
    personType: string
    name: string
    email: string
    document: string
    phoneNumber: string
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    createdAt: Date
  }
}
