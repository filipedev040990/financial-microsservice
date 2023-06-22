import { SaveChargeTraceUseCase } from '@/application/usecases/charge/save-charge-trace.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { ChargeTraceRepository } from '@/infra/database/repositories/charge-trace.repository'

export const makeSaveChargeTraceUseCase = (): SaveChargeTraceUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new ChargeTraceRepository()
  return new SaveChargeTraceUseCase(uuidGenerator, repository)
}
