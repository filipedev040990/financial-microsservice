import { SaveRequestUseCase } from '@/application/usecases/request/save-request.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { RequestRepository } from '@/infra/database/repositories/request-repository'

export const makeSaveRequestUseCase = (): SaveRequestUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new RequestRepository()
  return new SaveRequestUseCase(uuidGenerator, repository)
}
