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
import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'
import { SendEncryptedCardDataToPciSecurityServiceInterface } from '@/application/contratcs/send-encrypted-card-usecase.interface'

const schemaValidator = mock <SchemaValidatorInterface <typeof chargeSchema>>()
const saveClientUseCase = mock<SaveClientUseCaseInterface>()
const savePayerUseCase = mock<SavePayerUseCaseInterface>()
const saveCreditCardUseCase = mock<SaveCreditCardUseCaseInterface>()
const saveChargeUseCase = mock<SaveChargeUseCaseInterface>()
const saveChargeTraceUseCase = mock<SaveChargeTraceUseCaseInterface>()
const encryptData = mock<EncryptDataInterface>()
const sendEncryptedCardDataToPciSecurity = mock<SendEncryptedCardDataToPciSecurityServiceInterface>()

describe('SaveChargeController', () => {
  let sut: SaveChargeController
  let input: HttpRequest
  let client: SaveClientUseCaseInterface.Input
  let payer: SavePayerUseCaseInterface.Input
  let creditCard: SaveCreditCardUseCaseInterface.Input
  let charge: any

  beforeAll(() => {
    sut = new SaveChargeController(schemaValidator, saveClientUseCase, savePayerUseCase, saveCreditCardUseCase, saveChargeUseCase, saveChargeTraceUseCase, encryptData, sendEncryptedCardDataToPciSecurity)

    schemaValidator.validate.mockReturnValue({ success: true })

    saveClientUseCase.execute.mockResolvedValue('anyClientId')
    savePayerUseCase.execute.mockResolvedValue('anyPayerId')
    saveChargeUseCase.execute.mockResolvedValue('anyChargeId')
    encryptData.encrypt.mockReturnValue('AnyEncryptedData')
    saveCreditCardUseCase.execute.mockResolvedValue('anyCreditCardIdentifier')

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
    expect(saveCreditCardUseCase.execute).toHaveBeenCalledWith(input.body.creditCard)
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

  test('should call EncryptData once and with correct values', async () => {
    await sut.execute(input)

    expect(encryptData.encrypt).toHaveBeenCalledTimes(1)
    expect(encryptData.encrypt).toHaveBeenCalledWith({
      identifier: 'anyCreditCardIdentifier',
      brand: 'anyBrand',
      number: '1234567891021365',
      monthExpiration: '12',
      yearExpiration: '2023'
    })
  })

  test('should call SendEncryptedCardDataToPciSecurity once and with correct values', async () => {
    await sut.execute(input)

    expect(sendEncryptedCardDataToPciSecurity.execute).toHaveBeenCalledTimes(1)
    expect(sendEncryptedCardDataToPciSecurity.execute).toHaveBeenCalledWith('AnyEncryptedData')
  })
})
