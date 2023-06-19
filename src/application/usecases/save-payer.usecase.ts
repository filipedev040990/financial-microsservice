import { SavePayerUseCaseInterface } from '../contratcs/save-payer-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SavePayerUseCase implements SavePayerUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: SavePayerUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.generate()
  }
}
