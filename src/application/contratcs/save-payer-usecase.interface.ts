export interface SavePayerUseCaseInterface {
  execute (input: SavePayerUseCaseInterface.Input): Promise<string>
}

export namespace SavePayerUseCaseInterface {
  export type Input = {
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
  }
}
