import { SaveClientRepositoryInterface } from '@/application/contratcs/client-repository.interface'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveClientRepositoryInterface
  ) {}

  async execute (input: SaveClientUseCaseInterface.Input): Promise<string> {
    const id = this.uuidGenerator.generate()

    await this.repository.save({
      id,
      identifier: input.identifier,
      name: input.name,
      email: input.email,
      document: input.document,
      phoneNumber: input.phoneNumber,
      birthDate: input.birthDate,
      createdAt: new Date()
    })

    return id
  }
}
