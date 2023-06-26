import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import constants from '@/infra/constants'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'
import { SaveRequestUseCaseInterface } from '@/application/contratcs/save-request-usecase.interface'
import { UpdateRequestUseCaseInterface } from '@/application/contratcs/update-request-usecase.interface'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<typeof chargeSchema>,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly savePayerUseCase: SavePayerUseCaseInterface,
    private readonly saveCreditCardUseCase: SaveCreditCardUseCaseInterface,
    private readonly saveChargeUseCase: SaveChargeUseCaseInterface,
    private readonly saveChargeTraceUseCase: SaveChargeTraceUseCaseInterface,
    private readonly encryptData: EncryptDataInterface,
    private readonly saveRequestUseCase: SaveRequestUseCaseInterface,
    private readonly updateRequestUseCase: UpdateRequestUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    try {
      const requestId = await this.saveRequestUseCase.execute({
        path: input.originalUrl,
        method: input.method as string,
        input: JSON.stringify(input.body)
      })

      const validateSchema = this.schemaValidator.validate(chargeSchema, input.body)
      if (!validateSchema.success) {
        return badRequest(validateSchema.error)
      }

      const { client, payer, creditCard, paymentMethod, totalValue } = input.body

      const clientId = await this.saveClientUseCase.execute(client)
      const payerId = await this.savePayerUseCase.execute(payer)

      const encryptedCardData = this.encryptData.encrypt(creditCard)

      await this.saveCreditCardUseCase.execute({
        payerId,
        encryptedData: encryptedCardData
      })

      const chargeId = await this.saveChargeUseCase.execute({
        clientId,
        payerId,
        paymentMethod: paymentMethod,
        status: constants.CHARGE_STATUS_WAITING,
        totalValue: totalValue
      })

      await this.saveChargeTraceUseCase.execute({
        chargeId,
        status: constants.CHARGE_STATUS_CREATED
      })

      await this.updateRequestUseCase.execute({ id: requestId, output: JSON.stringify({}), status: 201 })

      return success(201, null)
    } catch (error) {
      return serverError(error)
    }
  }
}
