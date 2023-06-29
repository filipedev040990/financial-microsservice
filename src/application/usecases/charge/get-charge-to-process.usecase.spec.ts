import { mock } from 'jest-mock-extended'
import { GetChargeToProcessRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { GetChargeToProcessUseCase } from './get-charge-to-process.usecase'

const repository = mock<GetChargeToProcessRepositoryInterface>()
const status: string = 'waiting'

describe('GetChargeToProcessUseCase', () => {
  let sut: GetChargeToProcessUseCase

  beforeAll(() => {
    sut = new GetChargeToProcessUseCase(status, repository)
    repository.getToProcess.mockResolvedValue([{
      client: {
        id: 'anyID',
        identifier: 'anyIdentifier',
        name: 'AnyName',
        email: 'anyEmail',
        document: 'anyDocument',
        birthDate: new Date('1990-01-01'),
        phoneNumber: ''
      },
      payer: {
        id: 'anyPayerId',
        personType: 'anyPersonType',
        name: 'AnyPayerName',
        email: 'anyPayerEmail',
        document: 'anyPayerDocument',
        phoneNumber: 'anyPayerPhoneNumber',
        cep: 'anyCep',
        street: 'anyStreet',
        number: 'anyNumber',
        complement: 'anyComplement',
        neighborhood: 'anyNeighnorhood',
        city: 'AnyCityi',
        state: 'anyState'
      },
      creditCard: {
        id: 'anyCreditCardId',
        payerId: 'anyPayerId',
        encryptedData: 'anyEncryptedData'
      },
      charge: {
        id: 'anyChargeId',
        clientId: 'anyID',
        payerId: 'anyPayerId',
        totalValue: 1500,
        paymentMethod: 'anyPaymentMethod',
        processingAttempts: 10
      }
    }])
  })

  test('should call ChargeRepository.getToProcess once and with correct id', async () => {
    await sut.execute()

    expect(repository.getToProcess).toHaveBeenCalledTimes(1)
    expect(repository.getToProcess).toHaveBeenCalledWith('waiting')
  })

  test('should return undefined if ChargeRepository.getToProcess returns undefined', async () => {
    repository.getToProcess.mockResolvedValueOnce(undefined as any)

    const output = await sut.execute()

    expect(output).toBeUndefined()
  })

  test('should return a Charge', async () => {
    const output = await sut.execute()

    expect(output).toEqual([{
      client: {
        id: 'anyID',
        identifier: 'anyIdentifier',
        name: 'AnyName',
        email: 'anyEmail',
        document: 'anyDocument',
        birthDate: new Date('1990-01-01'),
        phoneNumber: ''
      },
      payer: {
        id: 'anyPayerId',
        personType: 'anyPersonType',
        name: 'AnyPayerName',
        email: 'anyPayerEmail',
        document: 'anyPayerDocument',
        phoneNumber: 'anyPayerPhoneNumber',
        cep: 'anyCep',
        street: 'anyStreet',
        number: 'anyNumber',
        complement: 'anyComplement',
        neighborhood: 'anyNeighnorhood',
        city: 'AnyCityi',
        state: 'anyState'
      },
      creditCard: {
        id: 'anyCreditCardId',
        payerId: 'anyPayerId',
        encryptedData: 'anyEncryptedData'
      },
      charge: {
        id: 'anyChargeId',
        clientId: 'anyID',
        payerId: 'anyPayerId',
        totalValue: 1500,
        paymentMethod: 'anyPaymentMethod',
        processingAttempts: 10
      }
    }])
  })
})
