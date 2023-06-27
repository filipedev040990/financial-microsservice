import { UpdateChargeStatusUseCase } from '@/application/usecases/charge/update-charge-status.usecase'
import { ChargeRepository } from '@/infra/database/repositories/charge.repository'

export const makeUpdateChargeStatusUseCase = (): UpdateChargeStatusUseCase => {
  const repository = new ChargeRepository()
  return new UpdateChargeStatusUseCase(repository)
}
