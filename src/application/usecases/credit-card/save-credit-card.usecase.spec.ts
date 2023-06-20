import { SaveCreditCardUseCase } from './save-credit-card.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { mock } from 'jest-mock-extended'

const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveCreditCardUseCase', () => {
  let sut: SaveCreditCardUseCase
  let input: SaveCreditCardUseCaseInterface.Input

  beforeAll(() => {
    sut = new SaveCreditCardUseCase(uuidGenerator)

    input = {
      brand: 'anyBrand',
      number: '1234567891021365',
      monthExpiration: '12',
      yearExpiration: '2023'
    }
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
