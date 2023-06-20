import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveChargeUseCase implements SaveChargeUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: SaveChargeUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.generate()
  }
}
