import { mock } from 'jest-mock-extended'
import { CredentialsApi, GetTokenUseCase } from './get-token.usecase'
import { CacheInterface } from '@/application/contratcs/cache'

const cache = mock<CacheInterface>()

describe('GetTokenUseCase', () => {
  let sut: GetTokenUseCase
  let key: string
  let credentials: CredentialsApi

  beforeAll(() => {
    credentials = {
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    }

    key = 'anyKey'

    sut = new GetTokenUseCase(credentials, cache)

    cache.get.mockReturnValue('anyToken')
  })

  test('should call Cache.get once and with correct key', async () => {
    await sut.execute(key)

    expect(cache.get).toHaveBeenCalledTimes(1)
    expect(cache.get).toHaveBeenCalledWith('anyKey')
  })

  test('should return the value of cache', async () => {
    const output = await sut.execute(key)

    expect(output).toBe('anyToken')
  })
})
