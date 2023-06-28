import { mock } from 'jest-mock-extended'
import { GetChargeByIdUseCase } from './get-charge-by-id.usecase'
import { GetChargeByIdRepositoryInterface } from '@/application/contratcs/charge-repository.interface'

const repository = mock<GetChargeByIdRepositoryInterface>()
const id: string = 'anyId'

describe('GetChargeByIdUseCase', () => {
  let sut: GetChargeByIdUseCase

  beforeAll(() => {
    sut = new GetChargeByIdUseCase(repository)
  })

  test('should call ChargeRepository.getById once and with correct id', async () => {
    await sut.execute(id)

    expect(repository.getById).toHaveBeenCalledTimes(1)
    expect(repository.getById).toHaveBeenCalledWith('anyId')
  })
})
