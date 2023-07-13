import { CacheInterface } from '@/application/contratcs/cache'
import { GetTokenInterfaceUseCase } from '@/application/contratcs/get-token-api.interface'

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
    return cacheToken
  }
}
