import { SaveChargeRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveChargeUseCase implements SaveChargeUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveChargeRepositoryInterface
  ) {}

  async execute (input: SaveChargeUseCaseInterface.Input): Promise<void> {
    await this.repository.save({
      id: this.uuidGenerator.generate(),
      clientId: input.clientId,
      payerId: input.payerId,
      paymentMethod: input.paymentMethod,
      status: input.status,
      totalValue: input.totalValue,
      createdAt: new Date()
    })
  }
}
