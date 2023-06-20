import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'
import { badRequest } from '@/shared/helpers/http.helper'
import { InvalidParamError } from '@/shared/errors'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<typeof chargeSchema>
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    const validateSchema = this.schemaValidator.validate(chargeSchema, input.body)
    if (!validateSchema.success) {
      return badRequest(new InvalidParamError(validateSchema.error ?? 'Validation schema error'))
    }

    return null
  }
}
