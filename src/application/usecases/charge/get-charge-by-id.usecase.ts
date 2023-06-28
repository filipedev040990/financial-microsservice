import { GetChargeByIdRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { GetChargeByIdUseCaseInterface } from '@/application/contratcs/get-charge-by-id-usecase.interface'

export class GetChargeByIdUseCase implements GetChargeByIdUseCaseInterface {
  constructor (private readonly repository: GetChargeByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetChargeByIdUseCaseInterface.Output | undefined> {
    const charge = await this.repository.getById(id)
    return charge ?? undefined
  }
}
