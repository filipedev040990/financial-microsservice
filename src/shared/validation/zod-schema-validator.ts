import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { ZodSchema } from 'zod'

export class ZodSchemaValidator implements SchemaValidatorInterface <ZodSchema> {
  validate<T>(schema: ZodSchema<T>, data: T): { success: boolean, error?: any | undefined } {
    const response = schema.safeParse(data)
    if (!response.success) {
      return {
        success: false,
        error: response.error.issues
      }
    }
    return {
      success: true
    }
  }
}
