import { UUIDGeneratorInterface } from '../../contratcs/uuid-generator.interface'
import { SavePayerUseCase } from './save-payer.usecase'
import { SavePayerUseCaseInterface } from '../../contratcs/save-payer-usecase.interface'
import { SavePayerRepositoryInterface } from '../../contratcs/payer-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SavePayerRepositoryInterface>()

describe('SavePayerUseCase', () => {
  let sut: SavePayerUseCase
  let input: SavePayerUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SavePayerUseCase(uuidGenerator, repository)

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

    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call repository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
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
      state: 'AnyState',
      createdAt: new Date()
    })
  })
})
