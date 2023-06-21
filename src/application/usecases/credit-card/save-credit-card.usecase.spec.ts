import { SaveCreditCardUseCase } from './save-credit-card.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SaveCreditCardRepositoryInterface>()
const identifierGeneratorMock = jest.spyOn(SaveCreditCardUseCase.prototype as any, 'identifierGenerator')

describe('SaveCreditCardUseCase', () => {
  let sut: SaveCreditCardUseCase
  let input: SaveCreditCardUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveCreditCardUseCase(uuidGenerator, repository)

    input = {
      payerId: 'anyPayerId',
      brand: 'anyBrand',
      number: '1234567891021365',
      monthExpiration: '12',
      yearExpiration: '2023'
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
    identifierGeneratorMock.mockReturnValue('anyIdentifier')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call CreditCardRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      payerId: 'anyPayerId',
      identifier: 'anyIdentifier',
      brand: 'anyBrand',
      number: '123456XXXXXX1365',
      expiration: '2023-12',
      createdAt: new Date()

    })
  })

  test('should return an identifier', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('anyIdentifier')
  })
})
