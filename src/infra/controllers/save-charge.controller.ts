import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'
import { badRequest } from '@/shared/helpers/http.helper'
import { InvalidParamError } from '@/shared/errors'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import constants from '../constants'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<typeof chargeSchema>,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly savePayerUseCase: SavePayerUseCaseInterface,
    private readonly saveCreditCardUseCase: SaveCreditCardUseCaseInterface,
    private readonly saveChargeUseCase: SaveChargeUseCaseInterface,
    private readonly saveChargeTraceUseCase: SaveChargeTraceUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const validateSchema = this.schemaValidator.validate(chargeSchema, input.body)
    if (!validateSchema.success) {
      return badRequest(new InvalidParamError(validateSchema.error ?? 'Validation schema error'))
    }

    const clientId = await this.saveClientUseCase.execute(input.body.client)
    const payerId = await this.savePayerUseCase.execute(input.body.payer)
    await this.saveCreditCardUseCase.execute(input.body.creditCard)

    const chargeId = await this.saveChargeUseCase.execute({
      clientId,
      payerId,
      paymentMethod: input.body.charge.paymentMethod,
      status: constants.CHARGE_STATUS_WAITING,
      totalValue: input.body.charge.totalValue
    })

    await this.saveChargeTraceUseCase.execute({
      chargeId,
      status: constants.CHARGE_STATUS_CREATED
    })

    return null
  }
}
