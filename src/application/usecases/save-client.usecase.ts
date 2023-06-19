import { SaveClientUseCaseInterface } from '../contratcs/save-client-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: SaveClientUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.generate()
  }
}
