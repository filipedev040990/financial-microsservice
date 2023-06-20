import { HttpRequest } from '@/shared/types'
import { SaveChargeController } from './save-charge.controller'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { mock } from 'jest-mock-extended'
import { chargeSchema } from '../schemas/charge.schema'
import { InvalidParamError } from '@/shared/errors'

const schemaValidator = mock <SchemaValidatorInterface <typeof chargeSchema>>()
const clientUseCase = mock<SaveClientUseCaseInterface>()
const payerUseCase = mock<SavePayerUseCaseInterface>()

describe('SaveChargeController', () => {
  let sut: SaveChargeController
  let input: HttpRequest
  let client: SaveClientUseCaseInterface.Input
  let payer: SavePayerUseCaseInterface.Input
  let creditCard: SaveCreditCardUseCaseInterface.Input
  let charge: SaveChargeUseCaseInterface.Input

  beforeAll(() => {
    sut = new SaveChargeController(schemaValidator, clientUseCase, payerUseCase)

    schemaValidator.validate.mockReturnValue({ success: true })

    clientUseCase.execute.mockResolvedValue('anyClientId')
    payerUseCase.execute.mockResolvedValue('anyPayerId')

    client = {
      identifier: 'anyIdentifier',
      name: 'anyClient',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      phoneNumber: 'anyPhoneNumber'
    }

    payer = {
      personType: 'anyPersonType',
      name: 'AnyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber',
      cep: 'anyCep',
      street: 'AnyStreet',
      number: 'anyNumber',
      neighborhood: 'AnyNeighborhood',
      city: 'AnyCity',
      state: 'AnyState'
    }

    creditCard = {
      brand: 'anyBrand',
      number: '1234567891021365',
      monthExpiration: '12',
      yearExpiration: '2023'
    }

    charge = {
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000
    }

    input = {
      body: {
        client,
        payer,
        creditCard,
        charge
      }
    }
  })

  test('should call SchemaValidator.validate', async () => {
    await sut.execute(input)

    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
    expect(schemaValidator.validate).toHaveBeenCalledWith(chargeSchema, input.body)
  })

  test('should return 400 if validation schema fails', async () => {
    schemaValidator.validate.mockReturnValueOnce({ success: false, error: 'anyError' })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new InvalidParamError('anyError')
    })
  })

  test('should call SaveClientUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(clientUseCase.execute).toHaveBeenCalledTimes(1)
    expect(clientUseCase.execute).toHaveBeenCalledWith(input.body.client)
  })

  test('should call SavePayerUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(payerUseCase.execute).toHaveBeenCalledTimes(1)
    expect(payerUseCase.execute).toHaveBeenCalledWith(input.body.payer)
  })
})
