import { UpdateChargeStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'

export class UpdateChargeStatusUseCase implements UpdateChargeStatusUseCaseInterface {
  constructor (private readonly repository: UpdateChargeStatusRepositoryInterface) {}
  async execute (input: UpdateChargeStatusUseCaseInterface.Input): Promise<void> {
    await this.repository.updateStatus({
      id: input.id,
      status: input.status,
      updatedAt: new Date()
    })
  }
}
