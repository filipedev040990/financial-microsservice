import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'
import { SavePayerUseCase } from './save-payer.usecase'
import { SavePayerUseCaseInterface } from '../contratcs/save-payer-usecase.interface'
import { mock } from 'jest-mock-extended'

const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SavePayerUseCase', () => {
  let sut: SavePayerUseCase
  let input: SavePayerUseCaseInterface.Input

  beforeAll(() => {
    sut = new SavePayerUseCase(uuidGenerator)

    input = {
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
  })
  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
