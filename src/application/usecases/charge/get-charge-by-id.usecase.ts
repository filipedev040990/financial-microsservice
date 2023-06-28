import { GetChargeByIdRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { GetChargeByIdUseCaseInterface } from '@/application/contratcs/get-charge-by-id-usecase.interface'

export class GetChargeByIdUseCase implements GetChargeByIdUseCaseInterface {
  constructor (private readonly repository: GetChargeByIdRepositoryInterface) {}
  async execute (id: string): Promise<GetChargeByIdUseCaseInterface.Output | undefined> {
    await this.repository.getById(id)
    return undefined
  }
}
