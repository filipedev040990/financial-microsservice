import { GetTokenUseCase } from '@/application/usecases/token/get-token.usecase'
import { NodeCacheAdapter } from '@/infra/adapters/nodeCache.adapter'
import { config } from '@/infra/config'

export const makeGetTokenUseCase = (): GetTokenUseCase => {
  const credentials = {
    appId: config.application.appId,
    secretKey: config.application.secretKey
  }

  const cache = new NodeCacheAdapter()
  return new GetTokenUseCase(credentials, cache)
}
