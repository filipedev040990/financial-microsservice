import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { SchemaValidationError } from '@/shared/errors'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import constants from '@/infra/constants'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<typeof chargeSchema>,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly savePayerUseCase: SavePayerUseCaseInterface,
    private readonly saveCreditCardUseCase: SaveCreditCardUseCaseInterface,
    private readonly saveChargeUseCase: SaveChargeUseCaseInterface,
    private readonly saveChargeTraceUseCase: SaveChargeTraceUseCaseInterface,
    private readonly encryptData: EncryptDataInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    try {
      const validateSchema = this.schemaValidator.validate(chargeSchema, input.body)
      if (!validateSchema.success) {
        return badRequest(new SchemaValidationError(validateSchema.error ?? 'Validation schema error'))
      }

      const { client, payer, creditCard, charge } = input.body

      const clientId = await this.saveClientUseCase.execute(client)
      const payerId = await this.savePayerUseCase.execute(payer)

      const cardData = {
        payerId,
        ...creditCard
      }
      const encryptedCardData = this.encryptData.encrypt(cardData)

      await this.saveCreditCardUseCase.execute({
        payerId,
        encryptedData: encryptedCardData
      })

      const chargeId = await this.saveChargeUseCase.execute({
        clientId,
        payerId,
        paymentMethod: charge.paymentMethod,
        status: constants.CHARGE_STATUS_WAITING,
        totalValue: charge.totalValue
      })

      await this.saveChargeTraceUseCase.execute({
        chargeId,
        status: constants.CHARGE_STATUS_CREATED
      })

      return success(201, null)
    } catch (error) {
      return serverError(error)
    }
  }
}
