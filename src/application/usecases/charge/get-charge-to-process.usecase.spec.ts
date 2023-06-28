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
        id: '',
        identifier: '',
        name: '',
        email: '',
        document: '',
        birthDate: new Date('1990-01-01'),
        phoneNumber: ''
      },
      payer: {
        id: '',
        personType: '',
        name: '',
        email: '',
        document: '',
        phoneNumber: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      creditCard: {
        id: '',
        payerId: '',
        encryptedData: ''
      },
      charge: {
        id: '',
        clientId: '',
        payerId: '',
        totalValue: 1500,
        paymentMethod: ''
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
        id: '',
        identifier: '',
        name: '',
        email: '',
        document: '',
        birthDate: new Date('1990-01-01'),
        phoneNumber: ''
      },
      payer: {
        id: '',
        personType: '',
        name: '',
        email: '',
        document: '',
        phoneNumber: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      creditCard: {
        id: '',
        payerId: '',
        encryptedData: ''
      },
      charge: {
        id: '',
        clientId: '',
        payerId: '',
        totalValue: 1500,
        paymentMethod: ''
      }
    }])
  })
})
