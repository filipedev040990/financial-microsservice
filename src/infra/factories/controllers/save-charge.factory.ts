import { SaveChargeController } from '@/infra/controllers/save-charge.controller'
import { ZodSchemaValidator } from '@/shared/validation/zod-schema-validator'
import { makeSaveClientUseCase } from '../usecases/save-client.factory'
import { makeSavePayerUseCase } from '../usecases/save-payer.factory'
import { makeSaveCreditCardUseCase } from '../usecases/save-credit-card.factory'
import { makeSaveChargeUseCase } from '../usecases/save-charge.factory'
import { makeSaveChargeTraceUseCase } from '../usecases/save-charge-trace.factory'
import { CryptoJsAdapter } from '@/infra/adapters/cryptoJs.adapter'

export const makeSaveChargeController = (): SaveChargeController => {
  return new SaveChargeController(
    new ZodSchemaValidator(),
    makeSaveClientUseCase(),
    makeSavePayerUseCase(),
    makeSaveCreditCardUseCase(),
    makeSaveChargeUseCase(),
    makeSaveChargeTraceUseCase(),
    new CryptoJsAdapter(process.env.ENCRYPTION_KEY!)
  )
}
