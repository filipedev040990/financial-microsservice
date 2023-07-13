export interface CacheInterface {
  set(input: any): boolean
  get(key: string): any
}
