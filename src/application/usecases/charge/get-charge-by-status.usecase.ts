import { GetChargeByStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { GetChargeByStatusUseCaseInterface } from '@/application/contratcs/get-charge-by-status-usecase.interface'

export class GetChargeByStatusUseCase implements GetChargeByStatusUseCaseInterface {
  constructor (private readonly repository: GetChargeByStatusRepositoryInterface) {}
  async execute (status: string): Promise<GetChargeByStatusUseCaseInterface.Output [] | undefined> {
    const charge = await this.repository.getByStatus(status)
    return charge ?? undefined
  }
}
