import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import constants from '@/infra/constants'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { SaveRequestUseCaseInterface } from '@/application/contratcs/save-request-usecase.interface'
import { UpdateRequestUseCaseInterface } from '@/application/contratcs/update-request-usecase.interface'
import { config } from '../config'
import { GetTokenInterfaceUseCase } from '@/application/contratcs/get-token-api.interface'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<typeof chargeSchema>,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly savePayerUseCase: SavePayerUseCaseInterface,
    private readonly saveCreditCardUseCase: SaveCreditCardUseCaseInterface,
    private readonly saveChargeUseCase: SaveChargeUseCaseInterface,
    private readonly saveChargeTraceUseCase: SaveChargeTraceUseCaseInterface,
    private readonly saveRequestUseCase: SaveRequestUseCaseInterface,
    private readonly updateRequestUseCase: UpdateRequestUseCaseInterface,
    private readonly getTokenUseCase: GetTokenInterfaceUseCase
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const requestId = await this.saveRequestUseCase.execute({
      path: input.originalUrl,
      method: input.method as string,
      input: JSON.stringify(input.body)
    })

    try {
      const validateSchema = this.schemaValidator.validate(chargeSchema, input.body)
      if (!validateSchema.success) {
        return badRequest(validateSchema.error)
      }

      const { client, payer, paymentMethod, totalValue } = input.body

      const clientId = await this.saveClientUseCase.execute(client)
      const payerId = await this.savePayerUseCase.execute(payer)

      const externalIdentifier = await this.getTokenUseCase.execute(config.cache.cardEncryptorKey)

      await this.saveCreditCardUseCase.execute({
        payerId,
        externalIdentifier
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

      const output = success(201, null)

      await this.updateRequestUseCase.execute({ id: requestId, output: JSON.stringify(output), status: 201 })

      return output
    } catch (error) {
      await this.updateRequestUseCase.execute({ id: requestId, output: JSON.stringify(error), status: 500 })
      return serverError(error)
    }
  }
}
