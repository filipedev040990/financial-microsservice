import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveCreditCardUseCase implements SaveCreditCardUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: SaveCreditCardUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.generate()
  }
}
