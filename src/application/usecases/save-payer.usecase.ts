import { SavePayerRepositoryInterface } from '../contratcs/payer-repository.interface'
import { SavePayerUseCaseInterface } from '../contratcs/save-payer-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SavePayerUseCase implements SavePayerUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SavePayerRepositoryInterface
  ) {}

  async execute (input: SavePayerUseCaseInterface.Input): Promise<void> {
    await this.repository.save({
      id: this.uuidGenerator.generate(),
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
  }
}
