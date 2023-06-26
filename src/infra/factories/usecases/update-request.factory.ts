import { UpdateRequestUseCase } from '@/application/usecases/request/update-request.usecase'
import { RequestRepository } from '@/infra/database/repositories/request-repository'

export const makeUpdateRequestUseCase = (): UpdateRequestUseCase => {
  const repository = new RequestRepository()
  return new UpdateRequestUseCase(repository)
}
