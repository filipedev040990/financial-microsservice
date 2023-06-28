import { GetChargeByIdUseCase } from '@/application/usecases/charge/get-charge-by-id.usecase'
import { ChargeRepository } from '@/infra/database/repositories/charge.repository'

export const makeGetChargeByIdUseCase = (): GetChargeByIdUseCase => {
  const repository = new ChargeRepository()
  return new GetChargeByIdUseCase(repository)
}
