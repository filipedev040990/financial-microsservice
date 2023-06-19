import { ZodSchemaValidator } from './zod-schema-validator'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email()
})

describe('SchemaValidator', () => {
  let input: any
  let sut: ZodSchemaValidator

  beforeEach(() => {
    sut = new ZodSchemaValidator()

    input = {
      name: 'AnyName',
      age: 32,
      email: 'anyEmail@email.com'
    }
  })

  test('should return error if name is not provided', () => {
    input.name = undefined

    const output = sut.validate(userSchema, input)

    expect(output.success).toBeFalsy()
    expect(output.error).toBeTruthy()
  })

  test('should return error if age invalid type is provided', () => {
    input.age = '32'

    const output = sut.validate(userSchema, input)

    expect(output.success).toBeFalsy()
    expect(output.error).toBeTruthy()
  })

  test('should return success', () => {
    const output = sut.validate(userSchema, input)

    expect(output.success).toBeTruthy()
    expect(output.error).toBeFalsy()
  })
})
