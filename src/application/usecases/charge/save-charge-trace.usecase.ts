import { SaveChargeTraceRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveChargeTraceUseCase implements SaveChargeTraceUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveChargeTraceRepositoryInterface
  ) {}

  async execute (input: SaveChargeTraceUseCaseInterface.Input): Promise<void> {
    await this.repository.saveTrace({
      id: this.uuidGenerator.generate(),
      chargeId: input.chargeId,
      status: input.status,
      createdAt: new Date()
    })
  }
}
