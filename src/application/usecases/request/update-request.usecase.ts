import { UpdateRequestRepositoryInterface } from '@/application/contratcs/update-request-repository.interface'
import { UpdateRequestUseCaseInterface } from '@/application/contratcs/update-request-usecase.interface'

export class UpdateRequestUseCase implements UpdateRequestUseCaseInterface {
  constructor (private readonly updateRepository: UpdateRequestRepositoryInterface) {}
  async execute (input: UpdateRequestUseCaseInterface.Input): Promise<void> {
    await this.updateRepository.update({
      id: input.id,
      output: input.output,
      status: input.status,
      updatedAt: new Date()
    })
  }
}
