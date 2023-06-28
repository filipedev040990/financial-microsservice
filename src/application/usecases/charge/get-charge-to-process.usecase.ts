import { GetChargeToProcessRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { GetChargeToProcessUseCaseInterface } from '@/application/contratcs/get-charge-to-process-usecase.interface'

export class GetChargeToProcessUseCase implements GetChargeToProcessUseCaseInterface {
  constructor (
    private readonly status: string,
    private readonly repository: GetChargeToProcessRepositoryInterface
  ) {}

  async execute (): Promise<GetChargeToProcessUseCaseInterface.Output [] | undefined> {
    const charge = await this.repository.getToProcess(this.status)
    return charge ?? undefined
  }
}
