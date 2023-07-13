import { SaveCreditCardUseCase } from './save-credit-card.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { SaveCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SaveCreditCardRepositoryInterface>()

describe('SaveCreditCardUseCase', () => {
  let sut: SaveCreditCardUseCase
  let input: SaveCreditCardUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveCreditCardUseCase(uuidGenerator, repository)

    input = {
      payerId: 'anyPayerId',
      externalIdentifier: 'externalIdentifier'
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
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
      externalIdentifier: 'externalIdentifier',
      createdAt: new Date()

    })
  })
})
