import { CacheInterface } from '@/application/contratcs/cache'
import NodeCache from 'node-cache'

export class NodeCacheAdapter implements CacheInterface {
  private readonly cache: NodeCache

  constructor () {
    this.cache = new NodeCache()
  }

  set (key: string, data: any, ttl: number): boolean {
    return this.cache.set(key, data, ttl)
  }

  get (key: string): any {
    return this.cache.get(key)
  }
}
