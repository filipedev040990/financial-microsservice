import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { HttpRequest } from '@/shared/types'
import { chargeSchema } from '@/infra/schemas/charge.schema'

export class SaveChargeController implements ControllerInterface {
  constructor (
    private readonly schemaValidator: SchemaValidatorInterface<any>
  ) {}

  async execute (input: HttpRequest): Promise<any> {
    this.schemaValidator.validate(chargeSchema, input.body)
    return null
  }
}
