import { HttpRequest } from '@/shared/types'
import { SaveChargeController } from './save-charge.controller'
import { SaveClientUseCaseInterface } from '@/application/contratcs/save-client-usecase.interface'
import { SavePayerUseCaseInterface } from '@/application/contratcs/save-payer-usecase.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import { SchemaValidatorInterface } from '@/application/contratcs/schema-validator.interface'
import { mock } from 'jest-mock-extended'
import { chargeSchema } from '../schemas/charge.schema'
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'
import { serverError } from '@/shared/helpers/http.helper'
import { SaveRequestUseCaseInterface } from '@/application/contratcs/save-request-usecase.interface'
import { UpdateRequestUseCaseInterface } from '@/application/contratcs/update-request-usecase.interface'
import { CacheInterface } from '@/application/contratcs/cache'
import { GetTokenInterfaceUseCase } from '@/application/contratcs/get-token-api.interface'
import { SaveCardExternalInterface } from '@/application/contratcs/save-card-external.interface'

const schemaValidator = mock <SchemaValidatorInterface <typeof chargeSchema>>()
const saveClientUseCase = mock<SaveClientUseCaseInterface>()
const savePayerUseCase = mock<SavePayerUseCaseInterface>()
const saveCreditCardUseCase = mock<SaveCreditCardUseCaseInterface>()
const saveChargeUseCase = mock<SaveChargeUseCaseInterface>()
const saveChargeTraceUseCase = mock<SaveChargeTraceUseCaseInterface>()
const encryptData = mock<EncryptDataInterface>()
const saveRequestUseCase = mock<SaveRequestUseCaseInterface>()
const updateRequestUseCase = mock<UpdateRequestUseCaseInterface>()
const cache = mock<CacheInterface>()
const getTokenUseCase = mock<GetTokenInterfaceUseCase>()
const saveCardExternalUseCase = mock<SaveCardExternalInterface>()

describe('SaveChargeController', () => {
  let sut: SaveChargeController
  let input: HttpRequest
  let client: SaveClientUseCaseInterface.Input
  let payer: SavePayerUseCaseInterface.Input
  let creditCard: any
  let charge: any

  beforeAll(() => {
    sut = new SaveChargeController(schemaValidator, saveClientUseCase, savePayerUseCase, saveCreditCardUseCase, saveChargeUseCase, saveChargeTraceUseCase, saveRequestUseCase, updateRequestUseCase, getTokenUseCase, saveCardExternalUseCase)

    schemaValidator.validate.mockReturnValue({ success: true })

    saveClientUseCase.execute.mockResolvedValue('anyClientId')
    savePayerUseCase.execute.mockResolvedValue('anyPayerId')
    saveChargeUseCase.execute.mockResolvedValue('anyChargeId')
    encryptData.encrypt.mockReturnValue('AnyExternalIdentifier')
    cache.get.mockReturnValue('anyToken')
    getTokenUseCase.execute.mockResolvedValue('anyToken')
    saveCardExternalUseCase.execute.mockResolvedValue('anyCardIdentifier')

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
      expiryMonth: '12',
      expiryYear: '2023',
      cvv: '123'
    }

    input = {
      originalUrl: 'any url',
      method: 'any method',
      body: {
        paymentMethod: 'credit_card',
        totalValue: 10000,
        client,
        payer,
        creditCard,
        charge
      },
      headers: {
        'x-real-ip': null,
        'cf-connecting-ip': null,
        'x-forwarded-for': null
      },
      socket: {
        remoteAddress: 'any ip'
      }
    }
    saveRequestUseCase.execute.mockResolvedValue('any request id')
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
      body: 'anyError'
    })
  })

  test('should call SaveClientUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveClientUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveClientUseCase.execute).toHaveBeenCalledWith(input.body.client)
  })

  test('should call SavePayerUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(savePayerUseCase.execute).toHaveBeenCalledTimes(1)
    expect(savePayerUseCase.execute).toHaveBeenCalledWith(input.body.payer)
  })

  test('should call SaveCreditCardUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveCreditCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCreditCardUseCase.execute).toHaveBeenCalledWith({
      payerId: 'anyPayerId',
      externalIdentifier: 'anyCardIdentifier'
    })
  })

  test('should call SaveChargeUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveChargeUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveChargeUseCase.execute).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000
    })
  })

  test('should call SaveChargeTraceUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveChargeTraceUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveChargeTraceUseCase.execute).toHaveBeenCalledWith({
      chargeId: 'anyChargeId',
      status: 'created'
    })
  })

  test('should return 201 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: null
    })
  })

  test('should return server error if any usecase throws', async () => {
    saveChargeTraceUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(new Error()))
  })

  test('should call saveRequestUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveRequestUseCase.execute).toHaveBeenCalledWith({
      path: 'any url',
      method: 'any method',
      input: JSON.stringify(input.body)
    })
  })

  test('should call updateRequestUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateRequestUseCase.execute).toHaveBeenCalledWith({
      id: 'any request id',
      output: JSON.stringify({ statusCode: 201, body: null }),
      status: 201
    })
  })

  test('should call updateRequestUseCase when any usecase throws', async () => {
    saveChargeTraceUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    await sut.execute(input)

    expect(updateRequestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateRequestUseCase.execute).toHaveBeenCalledWith({
      id: 'any request id',
      output: JSON.stringify(new Error()),
      status: 500
    })
  })

  test('should call getToken when cache is empty', async () => {
    cache.get.mockReturnValueOnce(null)

    await sut.execute(input)

    expect(getTokenUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getTokenUseCase.execute).toHaveBeenCalledWith('cardEncryptorToken')
  })

  test('should call SaveCardExternal once and with correct values', async () => {
    await sut.execute(input)

    expect(saveCardExternalUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCardExternalUseCase.execute).toHaveBeenCalledWith({
      brand: 'anyBrand',
      number: '1234567891021365',
      expiryMonth: '12',
      expiryYear: '2023',
      cvv: '123'
    }, 'anyToken')
  })
})
