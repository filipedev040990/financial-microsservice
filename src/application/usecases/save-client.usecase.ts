import { SaveClientRepositoryInterface } from '../contratcs/client-repository.interface'
import { SaveClientUseCaseInterface } from '../contratcs/save-client-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveClientRepositoryInterface
  ) {}

  async execute (input: SaveClientUseCaseInterface.Input): Promise<void> {
    await this.repository.save({
      id: this.uuidGenerator.generate(),
      identifier: input.identifier,
      name: input.name,
      email: input.email,
      document: input.document,
      phoneNumber: input.phoneNumber,
      birthDate: input.birthDate,
      createdAt: new Date()
    })
  }
}
