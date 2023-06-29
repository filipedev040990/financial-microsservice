import { GetChargeToProcessUseCase } from '@/application/usecases/charge/get-charge-to-process.usecase'
import constants from '@/infra/constants'
import { ChargeRepository } from '@/infra/database/repositories/charge.repository'

export const makeGetChargesToProcessUseCase = (): GetChargeToProcessUseCase => {
  const status = constants.CHARGE_STATUS_WAITING
  const repository = new ChargeRepository()
  return new GetChargeToProcessUseCase(status, repository)
}
