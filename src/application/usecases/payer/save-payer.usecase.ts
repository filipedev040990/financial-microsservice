import { SavePayerRepositoryInterface } from '@/application/contratcs/payer-repository.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SavePayerUseCase implements SavePayerUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SavePayerRepositoryInterface
  ) {}

  async execute (input: SavePayerUseCaseInterface.Input): Promise<string> {
    const id = this.uuidGenerator.generate()

    await this.repository.save({
      id,
      name: input.name,
      email: input.email,
      document: input.document,
      personType: input.personType,
      phoneNumber: input.phoneNumber,
      cep: input.cep,
      street: input.street,
      number: input.number,
      neighborhood: input.neighborhood,
      complement: input.complement ?? undefined,
      city: input.city,
      state: input.state,
      createdAt: new Date()
    })

    return id
  }
}
