import { SaveRequestRepositoryInterface } from '@/application/contratcs/save-request-repository.interface'
import { SaveRequestUseCaseInterface } from '@/application/contratcs/save-request-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveRequestUseCase implements SaveRequestUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly requestRepository: SaveRequestRepositoryInterface
  ) {}

  async execute (input: SaveRequestUseCaseInterface.Input): Promise<string> {
    return await this.requestRepository.save({
      id: this.uuidGenerator.generate(),
      path: input.path,
      method: input.method,
      input: input.input,
      createdAt: new Date()
    })
  }
}
