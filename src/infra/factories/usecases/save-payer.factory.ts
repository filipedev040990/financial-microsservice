
import { SavePayerUseCase } from '@/application/usecases/payer/save-payer.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { PayerRepository } from '@/infra/database/repositories/payer-repository'

export const makeSavePayerUseCase = (): SavePayerUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new PayerRepository()
  return new SavePayerUseCase(uuidGenerator, repository)
}
