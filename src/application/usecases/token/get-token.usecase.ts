import { CacheInterface } from '@/application/contratcs/cache'
import { GetTokenInterfaceUseCase } from '@/application/contratcs/get-token-api.interface'
import { config } from '@/infra/config'
import axios from 'axios'

export type CredentialsApi = {
  appId: string
  secretKey: string
}

export class GetTokenUseCase implements GetTokenInterfaceUseCase {
  constructor (
    private readonly credentials: CredentialsApi,
    private readonly cache: CacheInterface
  ) {}

  async execute (key: string): Promise<string> {
    const cacheToken = this.cache.get(key)
    if (cacheToken) {
      return cacheToken
    }

    const options = {
      method: 'post',
      url: `${config.cardEncryptorUrl}/auth`,
      data: this.credentials
    }

    const token = await axios(options)

    this.cache.set(key, token.data.token, config.cache.cardEncryptorTtl)

    return token.data.token
  }
}
