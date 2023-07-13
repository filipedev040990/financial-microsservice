import { SaveCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveCreditCardUseCase implements SaveCreditCardUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveCreditCardRepositoryInterface
  ) {}

  async execute (input: SaveCreditCardUseCaseInterface.Input): Promise<void> {
    await this.repository.save({
      id: this.uuidGenerator.generate(),
      externalIdentifier: input.externalIdentifier,
      payerId: input.payerId,
      createdAt: new Date()
    })
  }
}
