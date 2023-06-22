import { SaveChargeUseCase } from '@/application/usecases/charge/save-charge.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { ChargeRepository } from '@/infra/database/repositories/charge.repository'

export const makeSaveChargeUseCase = (): SaveChargeUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new ChargeRepository()
  return new SaveChargeUseCase(uuidGenerator, repository)
}
