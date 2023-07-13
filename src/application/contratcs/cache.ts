export interface CacheInterface {
  set(key: string, data: any, ttl: number): boolean
  get(key: string): any
}
